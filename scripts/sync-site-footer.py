"""Copy the homepage footer into the public site pages and article listings.

Run python3 scripts/sync-site-footer.py after changing the homepage footer
or adding an article. Published pages keep the footer in their static HTML.
"""

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
STYLESHEET = '<link rel="stylesheet" href="/site-layout.css">'
FOOTER = re.compile(r"<footer\b[^>]*>.*?</footer>", re.DOTALL)
PUBLIC_PAGES = (
    "about.html",
    "services.html",
    "faqs.html",
    "scheduling.html",
    "resources.html",
    "disclaimer.html",
    "privacy.html",
)


def main():
    homepage = (ROOT / "index.html").read_text(encoding="utf-8")
    footer, = FOOTER.findall(homepage)
    pages = [ROOT / name for name in PUBLIC_PAGES]
    pages.extend(
        path
        for path in sorted((ROOT / "blog").rglob("index.html"))
        if "<article" in path.read_text(encoding="utf-8")
    )
    for path in pages:
        source = path.read_bytes().decode("utf-8")
        newline = "\r\n" if "\r\n" in source else "\n"
        page_footer = footer.replace("\n", newline)
        updated, count = FOOTER.subn(lambda _: page_footer, source)
        if count == 0:
            if "</body>" not in source:
                raise ValueError(f"Missing closing body tag in {path}")
            updated = source.replace("</body>", page_footer + newline + "</body>", 1)
        elif count != 1:
            raise ValueError(f"Expected one footer in {path}, found {count}")
        if STYLESHEET not in updated:
            if "</head>" not in updated:
                raise ValueError(f"Missing closing head tag in {path}")
            updated = updated.replace("</head>", STYLESHEET + newline + "</head>", 1)
        if updated != source:
            path.write_bytes(updated.encode("utf-8"))


if __name__ == "__main__":
    main()

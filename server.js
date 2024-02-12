import { createServer } from "http";
import { readFile } from "fs/promises";
import renderJSXToHTML from "./renderJSXToHTML.js";
import PropTypes from "prop-types";

createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(res, <BlogPostPage postContent={postContent} author={author} />);
}).listen(8080);

function sendHTML(res, jsx) {
  const html = renderJSXToHTML(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}

BlogPostPage.propTypes = {
  postContent: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

function BlogPostPage({ postContent, author }) {
  return (
    <html lang="en">
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>{postContent}</article>
        <Footer author={author} />
      </body>
    </html>
  );
}

Footer.propTypes = {
  author: PropTypes.string.isRequired,
};

function Footer({ author }) {
  return (
    <footer>
      <hr />
      <p>
        <i>
          (c) {author} {new Date().getFullYear()}
        </i>
      </p>
    </footer>
  );
}

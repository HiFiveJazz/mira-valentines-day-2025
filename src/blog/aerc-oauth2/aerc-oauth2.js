const aercOauth2 = {
  slug: "aerc-oauth2-installation-guide",
  title: "Aerc OAuth 2.0 Installation Guide",
  meta: "February 28, 2026 • Projects",
  blocks: [
    {
      type: "text",
      content:
        "As I move towards needing to rely on email more and more, and wanting to contribute to the Linux Kernel, I wanted to move towards a terminal email client that used Vim bindings and possible support for git patches while also letting me efficiently manage my email. Options like Neomutt exist, but quite honestly they are very cumbersome to set up in comparison to Aerc, which just works out of the box with every feature I could want, except for one which I'll discuss at the end.",
    },
    {
      type: "image",
      src: "/blog-compressed/post_1.webp",
      alt: "Aerc config screenshot",
      caption: "A glance at my Aerc configuration.",
      width: "wide",
      fit: "cover",
    },
    { type: "heading", level: 2, content: "Getting Started" },
    {
      type: "text",
      content:
        "To get started, first install Aerc via your Linux Distribution. For me, it's `sudo pacman -S aerc`",
    },
    { type: "heading", level: 2, content: "Set up for Google" },
    {
      type: "text",
      content:
        "Head on over to `https://console.cloud.google.com/auth` and login to your account.",
    },
    {
      type: "text",
      content:
        "The first time you are there, you will have to accept their terms. This will take you to your dashboard which looks like the image below.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/1.webp",
      alt: "Google Auth dashboard",
      caption: "Clean Google Authentication Dashboard",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "Select `Create project` at the top right. You will have to give the project a Project name. What you choose for this doesn't matter, e.g., aerc-mail. If you are using Aerc as an internal you may also have to select your G-Suite Organization and Location. Click `Create` after filling up these fields.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/2.webp",
      alt: "Create project",
      caption: "Creating a project",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "You will need to configure your Google Auth. In order to do so, click on `Get Started`.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/3.webp",
      alt: "Get started",
      caption: "OAuth consent screen setup",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "From here, fill in the `App name` you decided before along with the email you plan on using for Aerc.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/4.webp",
      alt: "App info",
      caption: "Step 1: App Information",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "You will be asked to choose the `Audience`. Select `Internal` for a G-Suite account, and `External` for a personal email account, then hit `Create`.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/5.webp",
      alt: "Audience",
      caption: "Step 2: Audience",
      width: "wide",
      fit: "cover",
    },
    { type: "text", content: "Fill out your desired contact email." },
    {
      type: "image",
      src: "/blog-compressed/post-1/6.webp",
      alt: "Contact email",
      caption: "Step 3: Contact Information",
      width: "wide",
      fit: "cover",
    },
    { type: "text", content: "Check `Agree` and click on `Continue`" },
    {
      type: "image",
      src: "/blog-compressed/post-1/7.webp",
      alt: "Agree",
      caption: "Agree + Continue",
      width: "wide",
      fit: "cover",
    },
    { type: "text", content: "Finally, click on `Create`" },
    {
      type: "image",
      src: "/blog-compressed/post-1/8.webp",
      alt: "Create consent screen",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "If everything has been done correctly, you should see `OAuth configuration created` at the bottom. From here, you will need to `Create OAuth Client`.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/9.webp",
      alt: "OAuth created",
      caption: "Successful OAuth Configuration",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "Ensure your application type is `Web application` and add an authorized redirect URI to `https://google.github.io/gmail-oauth2-tools/html/oauth2.dance.html`. When done, click on `Create`.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/10.webp",
      alt: "OAuth client setup",
      caption: "OAuth Client Set-Up Page",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "If everything goes well, you will have successfully created your OAuth Client. Before closing your browser, you will need your `Client Secret`.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/11.webp",
      alt: "Client secret",
      caption: "Navigate to Client Secret",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "Make sure to note down your Client ID and Client secret. Once you close this page, you can no longer view your client secret so it's important to keep it somewhere safe!",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/12.webp",
      alt: "Client ID and secret",
      caption: "Client ID + Client Secret",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "From here, download the `oauth2.py` file below, and run it with the email, client ID, and client secret like the image below!",
    },
    {
      type: "download",
      label: "Download oauth2.py",
      href: "/blog-compressed/post-1/oauth2.py",
      filename: "oauth2.py",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/13.webp",
      alt: "Running oauth2.py",
      caption: "Running the script",
      width: "wide",
      fit: "cover",
    },
    {
      type: "text",
      content:
        "If you get the error below, you may need to wait a couple of hours for Google to fully enable the API before proceeding.",
    },
    {
      type: "image",
      src: "/blog-compressed/post-1/15.webp",
      alt: "Possible error",
      caption: "Possible Error",
      width: "wide",
      fit: "cover",
    },
    {
      type: "sources",
      items: [
        "https://tilde.club/~djhsu/aerc-gmail-oauth2.html",
        "https://www.youtube.com/watch?v=kpAwwgnZUxg",
        "https://alpineapp.email/alpine/alpine-info/misc/RegisteringAlpineinGmail.html",
      ],
    },
  ],
};

export default aercOauth2;

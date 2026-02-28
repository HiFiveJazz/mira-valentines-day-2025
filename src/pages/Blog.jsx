import Divider from '../components/Divider/Divider';
import BlogPost from '../components/BlogPost/BlogPost';
import Footer from '../components/Footer/Footer';

const Blog = () => {
  return (
    <div> 
      <Divider 
        title='Blog'
        gradientLg = 'linear-gradient(294deg, hsl(251, 58%,49%) 20%, hsl(133,77%,33%) 65%)'
        gradientMd = 'linear-gradient(294deg, rgb(255,255,0) 20%, rgba(200,200,200,0.3) 65%)'
        gradientSm = 'linear-gradient(294deg, rgb(0,128,255) 20%, rgba(200,200,200,0.3) 65%)'
      />

      <BlogPost
        title="Why I Built This Website"
        meta="February 27, 2026 • Personal"
        blocks={[
          {
            type: "text",
            content:
              "This website originally began as a personal photo gallery, but over time it evolved into something much more meaningful. It became a space where I could merge engineering with creativity."
          },
          {
            type: "image",
            src: "../../public/heart.webp",
            alt: "Early website screenshot",
            caption: "The early version of the site.",
            width: "wide",
            vh: "24",
            fit: "cover",
          },
          {
            type: "text",
            content:
              "What started as simple experimentation slowly transformed into a living archive of my growth — technically and personally."
          }
        ]}
      />

<BlogPost
        title="Why I Built This Website"
        meta="February 27, 2026 • Personal"
        blocks={[
          {
            type: "text",
            content:
              "This website originally began as a personal photo gallery, but over time it evolved into something much more meaningful. It became a space where I could merge engineering with creativity."
          },
          {
            type: "image",
            src: "../../public/heart.webp",
            alt: "Early website screenshot",
            caption: "The early version of the site.",
            width: "wide",
            vh: "24",
            fit: "cover",
          },
          {
            type: "text",
            content:
              "What started as simple experimentation slowly transformed into a living archive of my growth — technically and personally."
          }
        ]}
      />
      <Footer/>
    </div>
  );
};

export default Blog;

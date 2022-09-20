import React from 'react';
import Layout from '../components/Layout';
import { getAllPortfolioProjects } from '../lib/notion';
import slugify from 'slugify'
import MoreStories from '../components/MoreStories';
import Container from '../components/Container';

const Projects = ({ preview, projects }) => {
  return (
    <Layout preview={preview}>
      <Container className="">
        <h1 className="text-5xl pt-10 pb-20 text-center">My porfolio of web apps and sites</h1>
        <MoreStories className="" posts={projects} isProject={true} />
      </Container>
    </Layout>
  );
};


export async function getStaticProps({ preview = false }) {

  const data: any = await getAllPortfolioProjects(process.env.PORTFOLIO_DATABASE_ID);

  const projects = data.map(post => {
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      coverImage: post.properties.CoverImage.files[0].name,
      technologies: post.properties.Technologies.multi_select.map(item => item.name),
      description: post.properties.description.rich_text[0]?.plain_text || "",
      slug: slugify(post.properties.Name.title[0].plain_text.toLowerCase()),

    }
  })

  return {
    props: { preview, projects },
  }
}

export default Projects;
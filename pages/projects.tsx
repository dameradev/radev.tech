import React from 'react';
import slugify from 'slugify'

// COMPONENTS
import Layout from '@/components/Layout';
import MoreStories from '@/components/MoreStories';
import Container from '@/components/Container';

// UTILS
import { getAllPortfolioProjects } from '@/lib/notion';
import { PORTFOLIO_DATABASE_ID } from '@/lib/constants';

const Projects = ({ preview, projects }) => {
  return (
    <Layout preview={preview}>
      <Container className="">
        <h1 className="text-4xl md:text-5xl py-10 md:pt-10 md:pb-20 text-center">My portfolio of web apps and sites</h1>
        <MoreStories className="" posts={projects} isProject={true} />
      </Container>
    </Layout>
  );
};


export async function getStaticProps({ preview = false }) {

  const data: any = await getAllPortfolioProjects(PORTFOLIO_DATABASE_ID);

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
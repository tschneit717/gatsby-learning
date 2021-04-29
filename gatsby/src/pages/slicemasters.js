import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SliceMastersGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SliceMastersStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: -6rem 2rem 2rem 2rem;
    z-index: 3;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SliceMastersGrid>
        {slicemasters.map((person) => (
          <SliceMastersStyles key={person.id}>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SliceMastersStyles>
        ))}
      </SliceMastersGrid>
    </>
  );
}

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

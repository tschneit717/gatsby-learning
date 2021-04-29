import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--gray);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
`;

export default function BeersPage({ data }) {
  console.log(data);
  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} in stock`} />
      <h2 className="center">
        We have ${data.beers.nodes.length} beers availalbe. Dine in only!
      </h2>
      <BeerGridStyles>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          console.log(beer);
          return (
            <SingleBeerStyles key={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
              <p title={`${beer.title} out of 5 stars`}>
                <span>{`⭐️`.repeat(rating)}</span>
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐️`.repeat(5 - rating)}
                </span>
              </p>
              <span>({beer.rating.reviews})</span>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;

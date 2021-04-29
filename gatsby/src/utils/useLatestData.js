import { useEffect, useState } from 'react';

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();
  const gql = String.raw;
  const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }`;

  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: Check for errors
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}

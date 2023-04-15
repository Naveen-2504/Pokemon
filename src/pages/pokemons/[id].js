import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { statusColor, textColor } from "@/utilis/color";
import Link from "next/link";

const GET_POKE = gql`
  query GetPokemon($id: String!, $name: String!) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      classification
      types
      resistant
      fleeRate
      maxCP
      maxHP
      image
      evolutionRequirements {
        amount
        name
      }
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      weaknesses
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        fleeRate
        maxCP
        maxHP
        image
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`;

// evolutions
const DetailsPage = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_POKE, {
    variables: { id, name },
  });

  useEffect(() => {
    if (router.query.id) {
      const params = router.query.id.split("&");
      let id = `${params[0]}`;
      let name = `${params[1]}`;
      setId(id);
      setName(name);
    }
  }, [router, id, name]);

  if (loading) {
    return (
      <article
        style={{
          height: "100vh",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section className="pokemon"></section>
      </article>
    );
  }

  if (error) {
    return (
      <h2
        style={{
          height: "100vh",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Error Page
      </h2>
    );
  }

  if (data?.pokemon) {
    const {
      id,
      number,
      name,
      classification,
      types,
      resistant,
      fleeRate,
      maxCP,
      maxHP,
      image,
      weaknesses,
      weight,
      height,
      attacks,
      evolutions,
    } = data?.pokemon;
    return (
      <main
        style={{
          display: "grid",
          margin: "auto",
          maxWidth: 984,
          gridGap: 20,
          backgroundColor: "#fff",
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            margin: "4rem",
            fontSize: "2rem",
          }}
        >
          <h1>{name}</h1>
          <h1 style={{ color: "#919191" }}>#{number}</h1>
        </section>
        <article
          style={{
            display: "grid",
            maxWidth: 984,
            gridGap: 20,
            gridTemplateColumns: "0.5fr 1fr 0fr",
          }}
        >
          <article>
            <section style={{ padding: "0px 16px" }}>
              <Image src={image} alt="No Image" width={500} height={500} />
              <article style={{ padding: "1rem 0" }}>
                <h1 style={{ fontSize: "2rem" }}>Attacks</h1>
                <h2 style={{ marginTop: "4rem" }}>Fast</h2>
                <section
                  style={{
                    display: "flex",
                    gap: "2rem",
                    padding: "1rem 0",
                    flexWrap: "wrap",
                  }}
                >
                  <table style={{ width: "100%", lineHeight: "4rem" }}>
                    <tr>
                      <th>Name</th>
                      <th>Damage</th>
                      <th>Type</th>
                    </tr>

                    {attacks.fast.map((arr, i) => {
                      return (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <td>{arr.name}</td>
                          <td>{arr.damage}</td>
                          <td>{arr.type}</td>
                        </tr>
                      );
                    })}
                  </table>
                </section>
              </article>
              <article style={{ padding: "1rem 0" }}>
                <h2>Special</h2>
                <section
                  style={{
                    display: "flex",
                    gap: "2rem",
                    padding: "1rem 0",
                    flexWrap: "wrap",
                  }}
                >
                  <table style={{ width: "100%", lineHeight: "4rem" }}>
                    <tr>
                      <th>Name</th>
                      <th>Damage</th>
                      <th>Type</th>
                    </tr>

                    {attacks.special.map((arr, i) => {
                      return (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <td>{arr.name}</td>
                          <td>{arr.damage}</td>
                          <td>{arr.type}</td>
                        </tr>
                      );
                    })}
                  </table>
                </section>
              </article>
            </section>
          </article>
          <article>
            <section
              style={{
                padding: "2rem",
                flexWrap: "wrap",
                backgroundColor: "#30a7d7",
                borderRadius: 12,
                fontSize: "1.7rem",
              }}
            >
              <article
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0px",
                  width: "100%",
                }}
              >
                <section style={{ lineHeight: "32px", textAlign: "start" }}>
                  <p style={{ color: "#fff" }}>Height</p>
                  <p>{height?.maximum}</p>
                </section>
                <section style={{ lineHeight: "32px", textAlign: "end" }}>
                  <p style={{ color: "#fff" }}>Weight</p>
                  <p>{weight?.maximum}</p>
                </section>
              </article>
              <article
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0px",
                  width: "100%",
                }}
              >
                <section style={{ lineHeight: "32px", textAlign: "start" }}>
                  <p style={{ color: "#fff" }}>Classification</p>
                  <p>{classification}</p>
                </section>
                <section style={{ lineHeight: "32px", textAlign: "end" }}>
                  <p style={{ color: "#fff" }}>Flee Rate</p>
                  <p>{fleeRate}</p>
                </section>
              </article>
              <article
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0px",
                  width: "100%",
                }}
              >
                <section style={{ lineHeight: "32px", textAlign: "start" }}>
                  <p style={{ color: "#fff" }}>Max CP</p>
                  <p>{maxCP}</p>
                </section>
                <section style={{ lineHeight: "32px", textAlign: "end" }}>
                  <p style={{ color: "#fff" }}>Max HP</p>
                  <p>{maxHP}</p>
                </section>
              </article>
            </section>
            <article style={{ padding: "1rem 0" }}>
              <h2>Type</h2>
              <section
                style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "1rem 0",
                  flexWrap: "wrap",
                }}
              >
                {types.map((arr, i) => {
                  return (
                    <p
                      style={{
                        padding: "4px 3rem",
                        borderRadius: 5,
                        background: statusColor[arr],
                        color: textColor[arr],
                      }}
                      key={i}
                    >
                      {arr}
                    </p>
                  );
                })}
              </section>
            </article>
            <article style={{ padding: "1rem 0" }}>
              <h2>Weaknesses</h2>
              <section
                style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "1rem 0",
                  flexWrap: "wrap",
                }}
              >
                {weaknesses.map((arr, i) => {
                  return (
                    <p
                      style={{
                        background: statusColor[arr],
                        padding: "4px 3rem",
                        borderRadius: 5,
                        color: textColor[arr],
                      }}
                      key={i}
                    >
                      {arr}
                    </p>
                  );
                })}
              </section>
            </article>
            <article style={{ padding: "1rem 0" }}>
              <h2>Resistant</h2>
              <section
                style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "1rem 0",
                  flexWrap: "wrap",
                }}
              >
                {resistant.map((arr, i) => {
                  return (
                    <p
                      style={{
                        background: statusColor[arr],
                        padding: "4px 3rem",
                        borderRadius: 5,
                        color: textColor[arr],
                      }}
                      key={i}
                    >
                      {arr}
                    </p>
                  );
                })}
              </section>
            </article>
          </article>
        </article>
        {evolutions && (
          <section style={{ padding: "0px 16px" }}>
            <article
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className={styles.bgDetails}
            >
              <article>
                <section>
                  <figure>
                    <Image
                      src={image}
                      alt="No Image"
                      width={200}
                      height={200}
                      style={{
                        boxShadow: "0 4px 4px 0px #212121",
                        border: "5px solid #fff",
                        backgroundColor: "#616161",
                        padding: 10,
                        borderRadius: "50%",
                      }}
                    />
                    <figcaption
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 16,
                        margin: 12,
                      }}
                    >
                      <h3 style={{ color: "#fff" }}>{name}</h3>
                      <h3>#{number}</h3>
                    </figcaption>
                  </figure>
                  <section
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                  >
                    {types.map((arr, i) => {
                      return (
                        <article
                          style={{
                            background: statusColor[arr],
                            padding: "4px 1.5rem",
                            borderRadius: 5,
                            color: textColor[arr],
                          }}
                          key={i}
                        >
                          {arr}
                        </article>
                      );
                    })}
                  </section>
                </section>
              </article>
              <MdOutlineArrowForwardIos
                style={{ fontSize: "4rem", color: "#fff" }}
              />
              {evolutions.map((arr, i) => {
                return (
                  <>
                    <Link href={`/pokemons/${arr.id}&${arr.name}`}>
                      <article key={i}>
                        <section>
                          <figure>
                            <Image
                              src={arr.image}
                              alt="No Image"
                              width={200}
                              height={200}
                              style={{
                                boxShadow: "0 4px 4px 0px #212121",
                                border: "5px solid #fff",
                                backgroundColor: "#616161",
                                padding: 10,
                                borderRadius: "50%",
                              }}
                            />
                            <figcaption
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 16,
                                margin: 12,
                              }}
                            >
                              <h3 style={{ color: "#fff" }}>{arr.name}</h3>
                              <h3>#{arr.number}</h3>
                            </figcaption>
                          </figure>
                          <section
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "12px",
                            }}
                          >
                            {arr.types.map((arr, i) => {
                              return (
                                <article
                                  style={{
                                    background: statusColor[arr],
                                    padding: "4px 1.5rem",
                                    borderRadius: 5,
                                    color: textColor[arr],
                                  }}
                                  key={i}
                                >
                                  {arr}
                                </article>
                              );
                            })}
                          </section>
                        </section>
                      </article>
                    </Link>
                    {i !== evolutions.length - 1 && (
                      <MdOutlineArrowForwardIos
                        style={{ fontSize: "4rem", color: "#fff" }}
                      />
                    )}
                  </>
                );
              })}
            </article>
            <p className={styles.whiteCard}></p>
          </section>
        )}
        <Link href={`/`}>
          <section style={{ textAlign: "end", padding: "16px" }}>
            <button
              style={{
                backgroundColor: "#ee6b2f",
                color: "#fff",
                border: "none",
                padding: "1rem 3rem",
                borderRadius: 5,
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              Explore More Pokemon
            </button>
          </section>
        </Link>
      </main>
    );
  }
};

export default DetailsPage;

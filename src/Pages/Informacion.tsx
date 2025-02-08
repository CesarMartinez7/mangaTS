
import { useQuery } from "@apollo/client";
import Loading from "../Components/Loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useReducer } from "react";
import { GET_DATA_MANGA } from "../Request/Request1";
import { reducer, ConteoDeAcciones } from "../Types/MangaReducer";
import imageNotFound from "../../public/imagent.svg";
import { TypesTy } from "../Types/Manga";
import HookInformacion from "../Hooks/informacion"; 
import { ArrayEpisodios } from "../Hooks/informacion";
import { MangaPeticion } from "../Types/Manga";




export default function Manga() {
  const {handleClickAdd,numeriId,refEmbed} = HookInformacion()
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const { loading, error, data } = useQuery(GET_DATA_MANGA, {
    variables: {
      id: numeriId,
    },
  });

  

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;
  if (data) {
    const DATA: MangaPeticion = data.Media;
    return (
      <div className="flex w-full flex-col">
        <div className="flex flex-col h-auto w-full ">
          <div className=" h-[30vh] relative">
            <img
              src={
                DATA.bannerImage === null || ""
                  ? imageNotFound
                  : DATA.bannerImage
              }
              alt={`Baner de ${DATA.title.romaji}`}
              className="w-full relative h-full -z-30 object-cover  "
            />
            <div className=" inset-0 absolute bg-gradient-to-t from-base-100  to-transparent"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 lg:p-10 ">
            <div
              data-element="Datos"
              className="flex flex-col  gap-1.5 lg:p-12  p-5 "
            >
              <h3 className=" text-4xl font-medium ">{DATA.title.romaji}</h3>
              <div className="text-[11px] opacity-70 font-extralight mt-1.5 mb-1.5 gap-2 flex flex-re">
                <p>Year: {DATA.startDate.year}</p>
                <p>Romanji: {DATA.title.native}</p>
                <p>Score: {DATA.meanScore}</p>
                <p>Tp: {DATA.format}</p>
                <p>{DATA.isAdult ? "+18" : "+14"}</p>
              </div>

              <div className="flex gap-2.5">
                <button
                  className="btn btn-wide "
                  onClick={() => {
                    if (refEmbed.current && refEmbed instanceof HTMLEmbedElement) {
                      refEmbed.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <Icon icon="pixelarticons:edit" width="20" height="20" />{" "}
                  {DATA.type === TypesTy.ANIME ? "Ver" : "Leer"}
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleClickAdd(DATA)}
                >
                  <Icon icon="pixelarticons:heart" width="18" height="18" />
                  Añadir a favoritos
                </button>
              </div>
              <p
                className="font-extralight text-sm"
                dangerouslySetInnerHTML={{ __html: DATA.description }}
              ></p>
              <div role="tablist" className="tabs tabs-lift w-full">
                <input
                  type="radio"
                  name="my_tabs_3"
                  role="tab"
                  className="tab"
                  aria-label="Estado"
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                  <div className="stats">
                    <div className="stat">
                      <div className="stat-title">Estado</div>
                      <div className="stat-value">{DATA.status}</div>
                      <div className="stat-desc">
                        Año de lanzamiento:{" "}
                        <strong>{DATA.startDate.year}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="radio"
                  name="my_tabs_3"
                  role="tab"
                  className="tab"
                  aria-label="Etiquetas"
                  defaultChecked
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {DATA.tags.map((tag) => (
                      <kbd className="kbd-xs kbd" key={crypto.randomUUID()}>
                        {tag.name}
                      </kbd>
                    ))}
                  </div>
                </div>

                <input
                  type="radio"
                  name="my_tabs_3"
                  role="tab"
                  className="tab"
                  aria-label="Critica"
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                  <div className="stat">
                    <div className="stat-title">Critica</div>
                    <div className="stat-value">{DATA.averageScore}</div>
                    <div className="stat-desc">
                      Episodios: <strong>{DATA.episodes}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <img
                src={`${DATA.coverImage.large}`}
                alt=""
                className="rounded-2xl object-cover w-fit h-fit"
              />
            </div>
          </div>
          <div className="w-full lg:p-12  h-auto">
            {DATA.type === "ANIME" ? (
              <div className="w-full h-full p-0 md:p-7">
                <div className="flex justify-between items-center w-full">
                  <div className="mt-5 mb-5">
                    <button
                      onClick={() =>
                        dispatch({
                          type: ConteoDeAcciones.DECREMENT,
                          payload: 0,
                        })
                      }
                      className="btn"
                    >
                      <Icon
                        icon="pixelarticons:arrow-left"
                        width="20"
                        height="20"
                      />
                      Episodio anterior
                    </button>
                    <div className="dropdown dropdown-hover">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Episodios
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1]  auto-rows-max w-[69vw] grid grid-cols-8 grid-rows-auto overflow-y-scroll h-[60vh] gap-1 p-2 shadow"
                      >
                        {Array.from({ length: DATA.episodes }, (_, i) => (
                          <li>
                            <button 
                            className="btn btn-xs"
                              onClick={() =>
                                dispatch({
                                  type: ConteoDeAcciones.REASIGNAR,
                                  payload: i + 1,
                                })
                              }
                            >
                              Episodio {i + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn "
                      onClick={() => {
                        refEmbed.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                        dispatch({
                          type: ConteoDeAcciones.INCREMENT,
                          payload: 0,
                        });
                      }}
                    >
                      Siguiente Episodio
                      <Icon
                        icon="pixelarticons:arrow-right"
                        width="20"
                        height="20"
                      />
                    </button>
                  </div>
                </div>
                <div ref={refEmbed} className="aspect-video">
                  <embed
                    className="w-full h-[400px] md:h-[700px] aspect-[700px] rounded-2xl"
                    src={`https://vidsrc.cc/v2/embed/anime/ani${numeriId}/${state?.count}/sub?autoPlay=false`}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 md:h-screen gap-12">
                <div className="w-full md:h-[80vh] " ref={refEmbed}>
                  <iframe
                    title={`Cuadro de ${DATA.title.english} `}
                    className="w-full h-[600px] lg:h-screen rounded-xl p-6"
                    src={`https://vidsrc.icu/embed/manga/${numeriId}/${state?.count}`}
                  ></iframe>
                </div>
                <div className=" lg:p-6 w-full lg:h-screen flex gap-4 flex-col p-5.5">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <button
                        onClick={() =>
                          dispatch({
                            type: ConteoDeAcciones.DECREMENT,
                            payload: 0,
                          })
                        }
                        className="btn"
                      >
                        <Icon
                          icon="pixelarticons:arrow-left"
                          width="20"
                          height="20"
                        />
                        Anterior
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          dispatch({
                            type: ConteoDeAcciones.INCREMENT,
                            payload: 0,
                          })
                        }
                      >
                        Siguiente
                        <Icon
                          icon="pixelarticons:arrow-right"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="font- text-[16px]">Capitulo {state.count}</p>
                  </div>
                  <p className="font-medium mb-2 overflow-hidden">
                    Episodios - Capitulos
                  </p>
                  <ol className="grid grid-cols-10 g gap-2 h-full overflow-y-scroll scroll-smooth grid-flow-row auto-rows-max  ">
                    <ArrayEpisodios
                      episodes={DATA.chapters}
                      dispatch={dispatch}
                    ></ArrayEpisodios>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

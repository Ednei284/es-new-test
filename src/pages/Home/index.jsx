import styles from "./styles.module.css";
import secondLogo from "/images/logo/coopera-mogi-logo-2.png";
import { useEffect } from "react";
import api from "../../assets/services/api";
import { useState } from "react";

export function Home() {
  const [dataVendors, setDataVendors] = useState([])
  const [dataProducts, setDataProducts] = useState([])
  useEffect(() => {
    async function loadVendors() {
      await api.get('/vendor-all')
        .then(response => {
          setDataVendors(response.data); // Dados retornados pela API
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    loadVendors()
  }, [])
  useEffect(() => {
    async function loadVendors() {
      await api.get('/product-all')
        .then(response => {
          setDataProducts(response.data); // Dados retornados pela API
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    loadVendors()
  }, [])
  return (
    <>
      <div className={styles.imgHome}>
        <h1>Economia solidária em Mogi das Cruzes</h1>
        <p>Conheça nossos produtos e empreendimentos</p>
      </div>
      <div>
        {/* alteração */}
        <div className={`${styles.container} grid`}>
          <div className={styles.text}>
            <h2 className={styles.title}>Sobre nós</h2>

            <h2 className={styles.subtitle}>O que é o MOGISOL</h2>
            <p>
              O Fórum Mogiano de Economia Solidária (MOGISOL) é um espaço
              autônomo de reflexões, discussões e construção de ações voltados
              para a Economia Solidária no município de Mogi das Cruzes. Ele é
              composto pelos empreendimentos econômicos solidários, atores da
              sociedade civil, do poder público e apoiadores das ações da
              Economia Solidária.
            </p>

            <h2 className={styles.subtitle}>Surgimento do MOGISOL</h2>
            <p>
              O MOGISOL nasce como uma das consequências da 1ª Conferência
              Municipal de Economia Solidária, ocorrida em julho de 2024,
              iniciativa da Secretaria de Assistência Social de Mogi das Cruzes
              através do programa CONDUZ (Programa Municipal de Geração de
              Trabalho e Renda), que por sua vez foi a etapa municipal para a
              Conferência Estadual e Nacional ocorridas em 2025. O MOGISOL nasce
              do entendimento da necessidade de um espaço permanente e regular
              para as discussões, reflexões e construção das ações da Economia
              Solidária de forma cooperada, solidária e autogestionária!
            </p>
            <div className={styles.image}>
              <img src={secondLogo} alt="foto do coopera mogi" />
            </div>

            <h2 className={styles.subtitle}>O QUE É</h2>
            <p>
              A COOPERAMOGI é uma plataforma de divulgação e comercialização
              para os empreendimentos econômicos solidários de Mogi das Cruzes.
              Essa plataforma é uma iniciativa do MOGISOL - Fórum Mogiano de
              Economia Solidária e tem por objetivo ser um espaço de divulgação
              e potencialização dos trabalhos dos diversos empreendimentos que
              compõem a Rede de Economia Solidária municipal.
            </p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>
                  {
                    dataVendors.filter(
                      (vendor) => vendor.id != 0,
                    ).length
                  }
                  +
                  <p className={styles.statLabel}>Empreendimentos</p>
                </h3>
              </div>

              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>
                  {dataProducts.length}+
                  <p className={styles.statLabel}>Produtos</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

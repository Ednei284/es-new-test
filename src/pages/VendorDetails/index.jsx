import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { ClickLogger } from '../../components/ClickLogger/index.jsx';
import { Divider1 } from '../../components/Divider/index.jsx';
// import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { NavInter } from '../../components/NavInter/index.jsx';
import { useEffect } from 'react';
import api from '../../assets/services/api/index.js';
import { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/index.jsx';

export function VendorDetails() {
    const {
        vendor_name,
        vendor_id
    } = useParams('')
    const [dataVendors, setDataVendors] = useState(null)
    useEffect(() => {
        async function loadVendors() {
            await api.post('/vendor-id', { id: parseInt(vendor_id) })
                .then(response =>
                    setDataVendors(response.data)
                )
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
        }
        loadVendors()
    }, [])

    return (
        <section id="products" className={styles.sectionProducts}>
            <NavInter
                path={`/${vendor_name}/${vendor_id}`}
                name={vendor_name} />
            <div>
                {dataVendors &&
                    <ClickLogger
                        url='/vendor/update-click-vendor'
                        id={dataVendors?.id}
                    >
                        <div>
                            <div className={styles.profilePhoto}>
                                <ImageSlider images={dataVendors?.profilePhoto} alternativeText={dataVendors?.name} />
                            </div>
                            <Divider1>
                                <h2>
                                    Informações de {dataVendors?.name}
                                </h2>
                            </Divider1>
                            <div>
                                <div>
                                    <h2>Sobre {dataVendors?.name}</h2>
                                    <p>{dataVendors?.about}</p>
                                    <h2> Integrantes</h2>
                                    <p>{dataVendors?.integrants}</p>
                                    <h2>Categoria do empreendimento</h2>
                                    <p> {dataVendors?.categoryName}</p>
                                    <h2>WhatsApp</h2>
                                    <p> {dataVendors?.whatsapp}</p>

                                </div>
                            </div>
                        </div>
                    </ClickLogger >
                }
            </div >
        </section >
    );
}
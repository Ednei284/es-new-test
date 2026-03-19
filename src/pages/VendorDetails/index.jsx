import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { ClickLogger } from '../../components/ClickLogger/index.jsx';
import { Divider1 } from '../../components/Divider/index.jsx';
// import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { NavInter } from '../../components/NavInter/index.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/index.jsx';
const baseURL = import.meta.env.VITE_HOST

export function VendorDetails() {
    const {
        vendor_name,
        vendor_id
    } = useParams('')
    const [dataVendors, setDataVendors] = useState(null)
    useEffect(() => {

        async function fetchData() {
            try {
                const resVendors = await fetch(baseURL + '/vendor-id', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: parseInt(vendor_id) })
                })
                if (resVendors.ok) {
                    const data = await resVendors.json();
                    setDataVendors(data);
                }
            } catch (error) {
                console.error('Erro na requisição :', error);
            }
        }
        fetchData()

    }, [])

    return (
        <section id="products" className={styles.sectionProducts}>
            <div>
                {dataVendors && dataVendors.filter(v => v.id === parseInt(vendor_id)).map(vendor =>
                    <ClickLogger
                        url='/vendor/update-click-vendor'
                        id={vendor.id}
                        key={vendor.id}
                    >
                        <div>
                            <ImageSlider images={vendor.profilePhoto} alternativeText={vendor.name} />
                            <Divider1>
                                <h2>
                                    Informações de {vendor.name}
                                </h2>
                            </Divider1>
                            <div>
                                <div>
                                    <h2>Sobre {vendor.name}</h2>
                                    <p>{vendor.about}</p>
                                    <h2> Integrantes</h2>
                                    <p>{vendor.integrants}</p>
                                    <h2>Categoria do empreendimento</h2>
                                    <p> {vendor.categoryName}</p>
                                    <h2>WhatsApp</h2>
                                    <p> {vendor.whatsapp}</p>

                                </div>
                            </div>
                        </div>
                    </ClickLogger >)
                }
            </div >
            <NavInter
                path={`/${vendor_name}/${vendor_id}`}
                name={vendor_name}
            />
        </section >
    );
}
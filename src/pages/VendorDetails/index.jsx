import styles from './styles.module.css';
import { Link, useParams } from 'react-router-dom';
import { LogClick } from '../../components/ClickLogger/index.jsx';
import { Divider1, Divider3 } from '../../components/Divider/index.jsx';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { NavInter } from '../../components/NavInter/index.jsx';
import { useEffect } from 'react';
import api from '../../assets/services/api/index.js';
import { useState } from 'react';


export function VendorDetails() {
    const {
        category_name,
        category_id,
        vendor_name,
        vendor_id
    } = useParams('')
    const [dataVendors, setDataVendors] = useState([])
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
    console.log(dataVendors);

    return (
        <section id="products" className={styles.sectionProducts}>



            <NavInter
                path={`/${vendor_name}/${vendor_id}`}
                name={category_name} />

            <div>
                {dataVendors
                    .filter(vendor => vendor.id.toString() === vendor_id)
                    .map((vendor) =>
                        <LogClick
                            url='vendor'
                            key={vendor.id}
                            name={vendor.name}
                            vendorId={vendor.id}
                        >
                            <div>
                                <Divider3>
                                    <img style={{ borderRadius: "50%", width: "100px", height: "100px", display: 'flex', justifyContent: "center", alignItems: "center" }} src={vendor.profilePhoto} alt={vendor.name} />
                                </Divider3>

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
                                        {/* {vendor.facebook_link ? <a target='_blank' href={`https://www.facebook.com/${vendor.facebook_link}`}><FaFacebook className={styles.socialMedia} /></a> : ''}
                                            {vendor.instagram_link ? <a target='_blank' href={`https://www.instagram.com/${vendor.instagram_link}`}><FaInstagram className={styles.socialMedia} /></a> : ''}
                                            {vendor.tiktok_link ? <a target='_blank' href={`https://www.tiktok.com/@${vendor.tiktok_link}`}><FaTiktok className={styles.socialMedia} /></a> : ''} */}
                                    </div>


                                </div>
                            </div>
                        </LogClick >
                    )
                }
            </div >



        </section >
    );
}
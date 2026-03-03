import api from '../../assets/services/api/index'

export const ClickLogger = ({ children, id, productId, url }) => {
    const handleClick = async () => {
        try {
            if (url === '/vendor/update-click-vendor') {
                const response = await api.patch(url, {
                    id: id
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar o clique');
                }
            }
            if (url === '/product/update-click-product-whatsapp') {
                const response = await api.patch(url, {
                    vendorId: id, id: productId
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar o clique' + response.error);
                }
            }
            if (url === '/product/update-click-product') {
                const response = await api.patch(url, {
                    vendorId: id, id: productId
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar o clique' + response.error);
                }
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    };
    return divComponent(handleClick, children);
}

function divComponent(handleClick, children) {
    return (<div style={{ backgroundColor: 'transparent', background: 'transparent', border: 'none', transform: '.3s', transition: 'all .3s' }} onClick={handleClick}>
        {children}
    </div>)
}
import api from '../../assets/services/api/index'

export const LogClick = ({ children, id, url }) => {
    const handleClick = async () => {
        try {
            if (url === '/vendor/update-click-vendor') {
                const response = await api.patch(url, {
                    id
                });
                console.log(response.status);

                if (!response.ok) {
                    throw new Error('Erro ao enviar o clique');
                }
            }
            if (url === 'category') {
                const response = await api.post(url, {
                    id,
                    name
                });
                if (!response.ok) {
                    throw new Error('Erro ao enviar o clique');
                }
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    };
    return divComponent(handleClick, children);
}

export const LogProductClick = ({
    children,
    price,
    title,
    vendorId,
    categoryId,
    productId,
    url
}) => {
    const handleClick = async () => {
        try {
            const response = await api.post(`/${url}`, {
                productId,
                title,
                vendorId,
                categoryId,
                price
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar o clique');
            }

            console.log(response)
        } catch (error) {
            console.log(error)
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
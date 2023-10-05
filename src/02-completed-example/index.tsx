import {ChangeEvent, useState} from 'react';
import useDebounce from "../hooks/use-debounce.ts";
import type {Product} from "../types.tsx";

const CompleteExample = () => {
    const [products,setProducts] = useState<Product[]>()
    const [isPending, setPending] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState('')
    const debouncedSearch = useDebounce(search, 300)

    async function search(query?: string) {
        if (query === '') {
            setProducts(undefined)
            setPending(false)
            return
        }
        const data = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`).then(r => r.json())
        setProducts(data.products)
        setPending(false)
    }
    function onChange(e: ChangeEvent<HTMLInputElement>) {
            setInputValue(e.target.value)
            !isPending && setPending(true)
            debouncedSearch(e.target.value)
    }

    return (
        <div style={{width: '600px'}}>
            <div style={{position: 'absolute', top: 20}}>
                <input value={inputValue} onChange={onChange} placeholder='title'/>
            </div>
            <div>
                {isPending && <div>Wait...</div>}
                {!isPending && products?.map((product) => (
                    <article key={product.id}>
                        <img width={64} height={64} src={product.images?.[0]}/>
                        <div>
                            <p>{product.title}</p>
                            <span>{product.price} USD</span>
                        </div>
                    </article>
                ))}
                {!products && !isPending && <div>Start typing</div>}
                {(products && products.length < 1) && !isPending && <div>Nothing to show</div>}
            </div>
        </div>
    )
};

export default CompleteExample;
import {ChangeEvent, useState} from 'react';
import useDebounce from "../hooks/use-debounce.ts";
import type {Product} from "../types.tsx";

const DemoExample = () => {
    const [products,setProducts] = useState<Product[]>()

    const [inputValue, setInputValue] = useState('')
    const debouncedSearch = useDebounce(search, 300)

    function search(query?: string): void {
        fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`)
            .then(response => response.json())
            .then(json => {
                console.log(json.products)
                setProducts(json.products)
            })
    }
    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
        debouncedSearch(e.target.value)
    }

    return (
        <>
            <input value={inputValue} onChange={onChange} placeholder='title'/>
            <div>
                {products?.map((product,idx) => (
                    <article key={idx}>
                        <img width={64} height={64} src={product.images?.[0]}/>
                        <div>
                            <p>{product.title}</p>
                            <span>{product.price} USD</span>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
};

export default DemoExample;
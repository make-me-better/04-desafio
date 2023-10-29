import { HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Head from 'next/head'
import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { Product as ProductModel } from 'use-shopping-cart/core'
import { priceFormatter } from '@/utils/formatter'
import React, { useContext } from 'react'
import { CartContext } from '@/contexts/CartContext'

interface HomeProps {
  products: ProductModel[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()
  const { openCart } = useContext(CartContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddCart(
    event: React.MouseEvent<HTMLButtonElement>,
    product: ProductModel,
  ) {
    event.preventDefault()

    addItem(product)

    openCart()
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product
              href={`/product/${product.id}`}
              key={product.id}
              className="keen-slider__slide"
              prefetch={false}
            >
              <Image
                src={String(product.image)}
                width={520}
                height={480}
                alt=""
              />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{priceFormatter.format(product.price)}</span>
                </div>
                <button onClick={(event) => handleAddCart(event, product)}>
                  <Handbag weight="bold" size={32} />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => { // SSR
export const getStaticProps: GetStaticProps = async () => {
  // SSG
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price_id: price.id,
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      description: product.description,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}

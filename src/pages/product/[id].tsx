import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Product as ProductModel } from 'use-shopping-cart/core'
import { useContext } from 'react'
import Head from 'next/head'
import { priceFormatter } from '@/utils/formatter'
import { useShoppingCart } from 'use-shopping-cart'
import { CartContext } from '@/contexts/CartContext'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'

interface ProductProps {
  product: ProductModel
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  const { openCart } = useContext(CartContext)

  async function handleAddCart() {
    addItem(product)

    openCart()
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={String(product.image)} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{priceFormatter.format(product.price)}</span>

          <p>{product.description}</p>

          <button onClick={handleAddCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return { props: {} }
  }

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price_id: price.id,
        price: price.unit_amount ? price.unit_amount / 100 : 0,
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

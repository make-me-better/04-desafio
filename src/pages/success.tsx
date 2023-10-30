import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'

interface ProductModel {
  id: string
  name: string
  image: string
}

interface SuccessProps {
  customerName: string
  products: ProductModel[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {products.map((product) => {
            return (
              <ImageContainer key={product.id}>
                <Image src={product.image} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>
            {products.length > 1
              ? `compra de ${products.length} camisetas`
              : products[0].name}
          </strong>{' '}
          já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name

  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
    } as ProductModel
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}

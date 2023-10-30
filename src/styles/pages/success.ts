import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImagesContainer = styled('div', {
  display: 'flex',
  marginBottom: '3rem',

  'div + div': {
    marginLeft: '-3rem',
  },
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 99999999,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  boxShadow: '-11px 10px 91px -27px rgba(0,0,0,1)',
  '-webkit-box-shadow': '-11px 10px 91px -27px rgba(0,0,0,1)',
  '-moz-box-shadow': '-11px 10px 91px -27px rgba(0,0,0,1)',

  img: {
    objectFit: 'cover',
  },
})

import { keyframes, styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray300',
})

const translateRightToLeft = keyframes({
  '0%': { transform: 'translateX(110%)' },
  '100%': { transform: 'translateX(0%)' },
})

const translateLeftToRight = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(110%)' },
})

export const Content = styled(Dialog.Content, {
  position: 'absolute',
  zIndex: 9999,
  top: 0,
  left: 'calc(100vw - 30rem)',

  width: '30rem',
  height: '100vh',
  padding: '3rem',

  background: '$gray800',

  display: 'flex',
  flexDirection: 'column',

  "&[data-state='open']": {
    animation: `${translateRightToLeft} 300ms ease-in-out`,
  },

  "&[data-state='closed']": {
    animation: `${translateLeftToRight} 300ms ease-in-out`,
  },
})

export const Title = styled(Dialog.Title, {
  fontSize: '$lg',
  fontWeight: 'bold',
  color: '$gray100',
  lineHeight: 1.6,

  marginTop: '1.5rem',
})

export const CartListContainer = styled('div', {
  marginTop: '2rem',
  maxHeight: '55vh',
  overflow: 'scroll',

  '& > div + div': {
    marginTop: '1.53125rem',
  },
})

export const CartListItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
})

export const CartListItemImage = styled('div', {
  width: '6.375rem',
  height: '5.8125rem',
  borderRadius: 8,

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const CartListDetails = styled('div', {
  span: {
    fontSize: '$md',
    color: '$gray300',
    lineHeight: 1.6,

    strong: {
      display: 'block',
      color: '$gray100',
    },
  },

  button: {
    border: 0,
    background: 'transparent',
    color: '$green500',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '0.5rem',
    fontSize: '$xs',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ResumeContainer = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  'div:nth-child(1)': {
    div: {
      fontSize: '$xs',
      color: '$gray100',
    },

    span: {
      fontSize: '$md',
      color: '$gray300',
    },
  },

  'div:nth-child(2)': {
    marginTop: '0.4375rem',
    div: {
      fontSize: '$xs',
      fontWeight: 'bold',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$gray300',
    },
  },

  button: {
    marginTop: '3.5625rem',
    border: 0,
    background: '$green500',
    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',
    padding: '1.25rem 0',
    borderRadius: 8,
    cursor: 'pointer',

    '&:hover': {
      background: '$green300',
    },
  },
})

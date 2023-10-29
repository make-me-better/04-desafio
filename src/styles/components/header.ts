import { styled } from '..'

export const HeaderContainer = styled('header', {
  padding: '2rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  position: 'relative',
  background: '$gray800',
  color: '$gray300',
  padding: '0.75rem',
  borderRadius: 6,
  border: 0,
  cursor: 'pointer',

  '&:hover': {
    color: '$gray100',
  },

  span: {
    position: 'absolute',
    background: '$green500',
    color: '$white',
    borderRadius: 9999,
    top: '-0.625rem',
    left: '2.2rem',
    fontSize: '0.75rem',
    width: '1.25rem',
    height: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
})

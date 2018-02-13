import styled from 'styled-components'

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  width: 100%;
`

export const LoginBox = styled.div`
  flex-direction: column!important;
  justify-content: center;
  display: flex!important;
  width: 50%;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`

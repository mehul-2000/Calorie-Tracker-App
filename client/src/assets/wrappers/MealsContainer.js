import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .meals {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .meals-datewise {
    display: grid;
    grid-template-columns: auto;
    row-gap:2rem;
    grid-column-gap:20px;
    grid-row-gap:10px;
  }
  .meals-list{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap:1rem;
  }
  @media (min-width: 992px) {
    .meals {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .meals-list{
    display: grid;
    grid-template-columns: 0.2fr 0.5fr 0.5fr 0.5fr 0.5fr;
    column-gap: 1rem;
    row-gap:1rem;
  }
    .meals-datewise{
      display: grid;
      grid-template-columns: 1fr;
      row-gap:2rem;
    }
  }
`
export default Wrapper

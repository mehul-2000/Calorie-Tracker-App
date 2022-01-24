import styled from 'styled-components'

const Wrapper = styled.section`
background-image: url(./bgimg.jpg);
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  
  }
  @media (min-width: 992px) {
  
    background-image: url(./bgimg.jpg);
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`
export default Wrapper

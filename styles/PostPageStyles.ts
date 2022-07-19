import styled from "styled-components"
import { device } from './deviceSIzes'

export const PostStyled = styled.article`
padding:0 2rem;
.post-content {
  display: flex;
  flex-direction:column;
  img {
    align-self: center !important;
    margin: 2rem 0;
    background: var(--color-background);
  }
  a {
    color: #FFA700;
    &:hover {
      text-decoration: underline;
    }
  }
}



.heading {
  font-size: 4rem;
  line-height: 5rem;
  margin: 2rem 0;
  &:target {
    scroll-margin-top: 100px;
  }
}


p {
  margin: 1rem 0;
  &.m-0 {
    margin: 0;
  }
}

ul {
  list-style: disc;
  
  padding-left: 2rem;
  li {
    margin: 1rem 0;
    @media ${device.tablet} {
      margin-left: 1rem;
      
    }
    ul {
      margin-left: 2rem;
      margin-bottom: 2rem;
      list-style: circle;
    }
  }
}


div.bg-info-window {
  margin: 2rem 0;
  background: var(--color-info-window);
  border-radius: 10px;
}

pre {
  min-width: 100%;
  max-height: 100vh;
  margin-top:0;
  background: var(--color-code);
  box-shadow: 0 4px 12px rgba(0,0,0,.38);
  font-size: 1.2rem;
  /* margin-top: 6rem !important; */
  position: relative;

  code {
    padding: 0;
    margin: 0;
  }
  

  button {
    background: var(--primary);
  }
}


  code {
    background: var(--color-code);
    padding: 0.3rem 1rem;
    border-radius: 5px;
    /* margin-right: 0.5rem; */
    font-size:1.6rem;
  }


.file-name {
  margin-top: 2rem;
  font-style: italic;
  text-align: right;
}

img {
  align-self: center;
}

.wp-block-image {
  display: flex;
  
  justify-content: center;
}
`
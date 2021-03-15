import { css } from 'lit-element';

export const wcNameStyles = css`
  :host {
    width:100%;
    font-family: "Amatic SC", cursive;
    font-size: 100%;
    -webkit-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    --cellSize: 1.25rem;

    --width-28: 100px;
  }
  
  .content {
    display: inline-flex;
    flex-direction: column;
  }

  .yearMainContainer,
  #daysHeader,
  #tableContainer {
    display: flex;
    flex-direction: column;
    justify-content: top;
  }
  .yearMainContainer {
    flex-direction: row;
  }
  #tableContainer {
    width: 80%;
    margin: 1rem;
    overflow-x: scroll;
    overflow-y: hidden;      
  }

  #daysHeader {
    margin-bottom: 0;
  }

  .dayHeader {
    width: var(--cellSize);
    height: var(--cellSize);
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    border: 1px solid transparent;
  }

  .monthDays {
    display: flex;
    flex-direction: row;
    border-right: 0.5rem solid red;
  }

  #monthHeader {
    display: flex;
    flex-direction: row;
  }
  .monthHeader {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .monthContainer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: var(--cellSize);
    border-right: 0.5rem solid red;
  }
  .monthContainer:hover {
    cursor: pointer;
  }
  .monthLetterBtn {
    width:var(--cellSize);
    padding:0;
  }

  .dayContainer {
    width: var(--cellSize);
    height: var(--cellSize);
    border: 1px solid #dfe8ea;
  }

  @media (min-width: 769px) {
    .content {
      display: flex;
      justify-content: center;
      --cellSize: 1rem;
    }

    .yearMainContainer {
      flex-direction: row;
    }

    #daysHeader,
    .monthContainer {
      flex-direction: row;
    }
  }
  @media (max-width: 768px) {
    .content {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      width: 90%;
    }

    .yearMainContainer,
    #daysHeader,
    #monthHeader {
      flex-direction: row;
    }

    .dayHeader,
    #tableContainer {
      flex-direction: column;
    }

    .monthMainContainer {
      width:15rem;
      margin:0;
    }

    .monthMainContainer span.dayofweek {
      font-size:0.8rem;
    }
    .monthMainContainer span.dayofmonth { 
      border:1px solid #CCC; 
      height: 3rem;
      width: 2.1rem; 
      font-size:0.8rem;
    }
  }
`;

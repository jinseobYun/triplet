import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as USFlag } from '../../assets/pay/us.svg';
import { ReactComponent as EUFlag } from '../../assets/pay/eu.svg';
import { ReactComponent as JPFlag } from '../../assets/pay/jp.svg';
import { ReactComponent as CHFlag } from '../../assets/pay/ch.svg';
import { ReactComponent as UKFlag } from '../../assets/pay/uk.svg';
import { ReactComponent as SWFlag } from '../../assets/pay/sw.svg';
import { ReactComponent as CAFlag } from '../../assets/pay/ca.svg';


const s = {
  Containter: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  `,
  Country: styled.span`
    font-size: 14px;
    font-weight: 500;
    margin-left: 12px;
  `,
  CountryArea: styled.div`
    display: flex;
    align-items: center;
  `,
  ForeignCurrency: styled.span`
    font-size: 16px;
    font-weight: 600;
  `,
  LocalCurrency: styled.span`
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    margin-top: 4px;
  `,
  CurrencyArea: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    
  `,
  ExchangeButton: styled.button<ExchangeProps>`
    background-color: #FFFFFF;
    border: solid 1px #008DE7;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    color: #008DE7;
    width: 64px;
    height: 36px;
    margin-left: 16px;
    display: ${(props) => (props.$isExchange === true ? '' : 'none')};
  `,
  ButtonArea: styled.div`
    display: flex;
  `
}


interface GlobalAccountProps {
  nation: String;
  foreignCurrency: number;
  isExchange: boolean;
  accountId: number;
  rate: number;
};

interface ExchangeProps {
  $isExchange?: boolean;
}


const GlobalAccount = (props: GlobalAccountProps): JSX.Element => {
  const { nation, foreignCurrency, isExchange, accountId, rate } = props;
  const navigate = useNavigate();

  return (
    <>
    <s.Containter>
      {(() => {
        switch (nation) {
          case "미국":
            return <s.CountryArea><USFlag/><s.Country>미국</s.Country></s.CountryArea>
          case "유럽":
            return <s.CountryArea><EUFlag/><s.Country>유럽</s.Country></s.CountryArea>
          case "일본":
            return <s.CountryArea><JPFlag/><s.Country>일본</s.Country></s.CountryArea>
          case "중국":
            return <s.CountryArea><CHFlag/><s.Country>중국</s.Country></s.CountryArea>
          case "영국":
            return <s.CountryArea><UKFlag/><s.Country>영국</s.Country></s.CountryArea>
          case "스위스":
            return <s.CountryArea><SWFlag/><s.Country>스위스</s.Country></s.CountryArea>
          case "캐나다":
            return <s.CountryArea><CAFlag/><s.Country>캐나다</s.Country></s.CountryArea>
        }
      }) ()}
      <s.ButtonArea>
        <s.CurrencyArea>
          <div>
            <s.ForeignCurrency>{Number(foreignCurrency).toLocaleString()}</s.ForeignCurrency>
            {(() => {
              switch (nation) {
                case "미국":
                  return <s.ForeignCurrency> USD</s.ForeignCurrency>
                case "유럽":
                  return <s.ForeignCurrency> EUR</s.ForeignCurrency>
                case "일본":
                  return <s.ForeignCurrency> JPY</s.ForeignCurrency>
                case "중국":
                  return <s.ForeignCurrency> CNY</s.ForeignCurrency>
                case "영국":
                  return <s.ForeignCurrency> GBP</s.ForeignCurrency>
                case "스위스":
                  return <s.ForeignCurrency> CHF</s.ForeignCurrency>
                case "캐나다":
                  return <s.ForeignCurrency> CAD</s.ForeignCurrency>
              }
            }) ()}
          </div>
          {(() => {
            switch (nation) {
              case "미국":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate).toLocaleString()}원</s.LocalCurrency>
              case "유럽":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate).toLocaleString()}원</s.LocalCurrency>
              case "일본":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate/100).toLocaleString()}원</s.LocalCurrency>
              case "중국":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate).toLocaleString()}원</s.LocalCurrency>
              case "영국":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate).toLocaleString()}원</s.LocalCurrency>
              case "스위스":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate).toLocaleString()}원</s.LocalCurrency>
              case "캐나다":
                return <s.LocalCurrency>{Math.floor(foreignCurrency*rate).toLocaleString()}원</s.LocalCurrency>
            }
          }) ()}
        </s.CurrencyArea>
        <s.ExchangeButton $isExchange={isExchange} onClick={(event) => {
          event.stopPropagation(); // 충전 버튼 클릭 이벤트가 바깥 영역으로 안 퍼지게 막음
          navigate(`/pay/exchange/${accountId}`); // 해당 계좌 환전 페이지로 이동
        }}>충전</s.ExchangeButton>
      </s.ButtonArea>
    </s.Containter>
    </>
  );
}

export default GlobalAccount;
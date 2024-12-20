import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pageMove } from '../../features/navigation/naviSlice';
import BackHeader from '../../components/header/BackHeader';
import { ReactComponent as USFlag } from '../../assets/pay/us.svg';
import { ReactComponent as EUFlag } from '../../assets/pay/eu.svg';
import { ReactComponent as JPFlag } from '../../assets/pay/jp.svg';
import { ReactComponent as CHFlag } from '../../assets/pay/ch.svg';
import { ReactComponent as UKFlag } from '../../assets/pay/uk.svg';
import { ReactComponent as SWFlag } from '../../assets/pay/sw.svg';
import { ReactComponent as CAFlag } from '../../assets/pay/ca.svg';
import { ReactComponent as KRFlag } from '../../assets/pay/kr.svg';
import { ReactComponent as DownArrow } from '../../assets/pay/downArrow.svg';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const s = {
  Container: styled.div`
    margin-top: 56px;
    height: 100vh;
    padding: 0 16px;
    /* padding-bottom: 56px; */
  `,
  Title: styled.span`
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
  `,
  TitleArea: styled.div`
    display: flex;
    align-items: center;
  `,
  Caption: styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #666666;
  `,
  USFlag: styled(USFlag)`
    width: 24px;
  `,
  EUFlag: styled(EUFlag)`
    width: 24px;
  `,
  JPFlag: styled(JPFlag)`
    width: 24px;
  `,
  CHFlag: styled(CHFlag)`
    width: 24px;
  `,
  UKFlag: styled(UKFlag)`
    width: 24px;
  `,
  SWFlag: styled(SWFlag)`
    width: 24px;
  `,
  CAFlag: styled(CAFlag)`
    width: 24px;
  `,
  KRFlag: styled(KRFlag)`
    width: 24px;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    `,
  ExchangeInput: styled.input`
    font-size: 14px;
    font-weight: 500;
    background-color: #F9FAFC;
    border: solid 1px #F0F0F0;
    border-radius: 10px;
    height: 44px;
    width: 100%;
    padding: 0 16px;
  `,
    BtnArea: styled.div`
    display: flex;
    position: fixed;
    bottom: 84px;
    width: 100%;
    left: 0;
    right: 0;    
  `,
    PayBtn: styled.button`
    width:100%;
    height:44px;
    color : white;
    background-color : #008DE7;
    border-radius : 10px;
    border : none;
    box-sizing: border-box;
    margin: 0 16px;
    padding : 14px;
    &:disabled {
    background-color: #888888;
    cursor: not-allowed;
  }
  `,
    ErrorMessage: styled.div`
    color: #008DE7;
    font-size: 12px;
    margin-top: 5px;
  `,
}

  const ExchangePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 외화지갑 페이지에서 넘어온 id 저장
    const { accountId } = useParams();
    const [ exchangeRate, setExchangeRate ] = useState<number>(1);

  const { data: foreignDetailData, 
		error: foreignDetailError, 
		loading: foreignDetailLoading, 
		status: foreignDetailStatus, 
		refetch: foreignDetailRefetch } = useAxios(`/account/${accountId}`, 'GET');

  const { data: accountData, 
    error: accountError, 
    loading: accountLoading, 
    status: accountStatus, 
    refetch: accountRefetch } = useAxios(`/account`, 'GET');
  
  const { data: exchangeRateData, 
    error: exchangeRateError, 
    loading: exchangeRateLoading, 
    status: exchangeRateStatus, 
    refetch: exchangeRateRefetch } = useAxios(`/exchange-rate/${foreignDetailData?.data?.currency}`, 'GET');
  
  useEffect(() => {
    if (foreignDetailData) {
      const fetchData = async () => {
        try {
          await Promise.all([
            exchangeRateRefetch()
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      // setExchangeRate(exchangeRateData?.data?.exchangeRate)
    }
  }, [foreignDetailData])

  useEffect(() => {
    if (exchangeRateData) {

      setExchangeRate(exchangeRateData?.data?.exchangeRate)
    }
  }, [exchangeRateData])

  useEffect(() => {
    const fetchData = async () => {
			try {
        await Promise.all([
          accountRefetch(),     // 원화계좌 API 요청
          foreignDetailRefetch(),  // 외화계좌 API 요청
        ]);
			} catch (error) {
			  console.error('Error fetching data:', error);
			}
		};
    dispatch(pageMove("pay"));
    fetchData();
  }, []);

  const nation:string = "대한민국"
  const from = "일본"
  const to:string = foreignDetailData?.data?.accountName

  const [ fromAmount, setFromAmount ] = useState<any>('0');
  const [ toAmount, setToAmount ] = useState<any>('0');
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputTimeout, setInputTimeout] = useState<any>(null);

  const fromOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setFromAmount(value);
  
    // 기존 타이머가 있으면 제거
    if (inputTimeout) clearTimeout(inputTimeout);
  
    // 입력된 원화 금액을 외화로 환산
    let newToAmount = Math.floor(Number(value) / exchangeRate);
    if (foreignDetailData?.data?.currency === "JPY") {
      newToAmount = newToAmount * 100
    }
  
    // 일본 엔화(JPY)의 경우 100 단위로 나누어지지 않으면 유효성 검사 실패
    if (foreignDetailData?.data?.currency === "JPY" && newToAmount % 100 !== 0) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  
    // 2초 후 실행될 타이머 설정
    const timeout = setTimeout(() => {
        let correctFromAmount = Math.ceil(newToAmount * exchangeRate); // 소수점 반올림 후 원화로 다시 계산
        if (foreignDetailData?.data?.currency === "JPY") {
          correctFromAmount = Math.ceil(correctFromAmount / 100)
        }
        if (Number(value) > correctFromAmount) {
          setFromAmount(correctFromAmount);  // 올바른 원화 금액으로 수정
        }
        setToAmount(newToAmount);
    }, 2000);
  
    // 타이머 저장
    setInputTimeout(timeout);
  };
  
  const toOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setToAmount(value);
  
    // 엔화만 100단위인지 확인 
    const numericValue = Number(value);
    if (foreignDetailData?.data?.currency === "JPY" && numericValue % 100 !== 0) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  
    // 엔화(JPY) 입력 시 소수점 제거 및 100엔 단위로 설정
    let newFromAmount = Number(value) * exchangeRate;
    if (foreignDetailData?.data?.currency === "JPY") {
      newFromAmount = newFromAmount / 100
    }
  
    // 소수점 제거 후 반영
    if (newFromAmount % 1 !== 0) {
      newFromAmount = Math.floor(newFromAmount) + 1;
    }
  
    // 원화 칸에 즉시 반영
    setFromAmount(newFromAmount);
  };
  
  useEffect(() => {
    if (!Number(fromAmount)) {
      setFromAmount('0')
    } else {
      setFromAmount(Number(fromAmount))
    }
    if (foreignDetailData?.data?.currency === "JPY") {
      if (Math.floor(Number(fromAmount)/exchangeRate*100) !== Number(toAmount)) {
        setToAmount(Math.floor(Number(fromAmount)/exchangeRate*100))
      }
    } else {
      if (Math.floor(Number(fromAmount)/exchangeRate) !== Number(toAmount)) {
        setToAmount(Math.floor(Number(fromAmount)/exchangeRate))
      }
    }
  }, [fromAmount])

  useEffect(() => {
    if (!Number(toAmount)) {
      setToAmount('0')
    } else {
      setToAmount(Number(toAmount))
    }
    if (foreignDetailData?.data?.currency === "JPY") {
      if (Math.floor(Number(fromAmount)/exchangeRate*100) !== Number(toAmount)) {
        setFromAmount(Math.floor(Number(toAmount)*exchangeRate/100))
      }
    } else {
      if (Math.floor(Number(fromAmount)/exchangeRate) !== Number(toAmount)) {
        setFromAmount(Math.floor(Number(toAmount)*exchangeRate))
      }
    }
  }, [toAmount])

  useEffect(() => {
    console.log(exchangeRate)
  }, [exchangeRate])

  // 환전 요청 바디
  const requestBody = {
    targetCurrency: foreignDetailData?.data?.currency,
    sourceCurrency: "KRW",
    sourceAmount: fromAmount,
  };

  const { data: exchangeData, 
    error: exchangeError, 
    loading: exchangeLoading, 
    status: exchangeStatus, 
    refetch: exchangeRefetch } = useAxios(`/exchange`, 'POST',undefined, requestBody);
  
  const handlePayment = async () => {
    if (!isInvalid) {
      try {
          exchangeRefetch()
      } catch (error) {
        alert('충전이 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    if (exchangeStatus) {
      if (exchangeStatus === 200) { 
        navigate(`/pay/global-wallet`);
      } else {
        alert('잔액이 부족합니다.');
      }
    }
  }, [exchangeStatus])

  return(
    <>
    <BackHeader title='환전'/>
    <s.Container>
      <s.TitleArea>
        {(() => {
          switch (nation) {
            case "미국":
              return <><s.USFlag/><s.Title>미국 달러(USD)</s.Title></>
            case "유럽":
              return <><s.EUFlag/><s.Title>유럽 유로(EUR)</s.Title></>
            case "일본":
              return <><s.JPFlag/><s.Title>일본 엔(JPY)</s.Title></>
            case "중국":
              return <><s.CHFlag/><s.Title>중국 위안(CNY)</s.Title></>
            case "영국":
              return <><s.UKFlag/><s.Title>영국 파운드(GBP)</s.Title></>
            case "스위스":
              return <><s.SWFlag/><s.Title>스위스 프랑(CHF)</s.Title></>
            case "캐나다":
              return <><s.CAFlag/><s.Title>캐나다 달러(CAD)</s.Title></>
            case "대한민국":
              return <><s.KRFlag/><s.Title>대한민국 원(KRW)</s.Title></>
          }
        }) ()}
      </s.TitleArea>
      <s.Caption>보유 {accountData?.data?.accountBalance.toLocaleString()} {accountData?.data?.currency}</s.Caption>
      <s.InputArea><s.ExchangeInput onChange={fromOnChange} value={fromAmount}/></s.InputArea>
      
      <DownArrow/>

      <s.TitleArea>
        {(() => {
          switch (to) {
            case "미국":
              return <><s.USFlag/><s.Title>미국 달러(USD)</s.Title></>
            case "유럽":
              return <><s.EUFlag/><s.Title>유럽 유로(EUR)</s.Title></>
            case "일본":
              return <><s.JPFlag/><s.Title>일본 엔(JPY)</s.Title></>
            case "중국":
              return <><s.CHFlag/><s.Title>중국 위안(CNY)</s.Title></>
            case "영국":
              return <><s.UKFlag/><s.Title>영국 파운드(GBP)</s.Title></>
            case "스위스":
              return <><s.SWFlag/><s.Title>스위스 프랑(CHF)</s.Title></>
            case "캐나다":
              return <><s.CAFlag/><s.Title>캐나다 달러(CAD)</s.Title></>
            case "대한민국":
              return <><s.KRFlag/><s.Title>대한민국 원(KRW)</s.Title></>
          }
        }) ()}
      </s.TitleArea>
      <s.Caption>보유 {foreignDetailData?.data?.accountBalance.toLocaleString()} {foreignDetailData?.data?.currency}</s.Caption>
      <s.InputArea><s.ExchangeInput onChange={toOnChange} value={toAmount}/></s.InputArea>
      {isInvalid && foreignDetailData?.data?.currency === "JPY" && (
        <s.ErrorMessage>엔화는 100원 단위로만 환전 가능합니다.</s.ErrorMessage>
      )}
        <s.BtnArea>
          <s.PayBtn 
          onClick={handlePayment} disabled={isInvalid}>충전하기</s.PayBtn>
        </s.BtnArea>
    </s.Container>
    </>
  );
};

export default ExchangePage;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../components/header/BackHeader';
import { useDispatch } from 'react-redux';
import { pageMove } from '../../features/navigation/naviSlice';
import { ReactComponent as Wallet } from '../../assets/pay/wallet.svg';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import axios from "axios";
import axiosInstance from "../../services/axios";

interface Transaction {
  balance: number;
  categoryName: string;
  merchantName: string;
  transactionId: number;
  transactionDate: string;
  price: number;
}

interface TransactionsResponse {
  code: string;
  message: string;
  data: Transaction[];
}

interface Category {
  categoryId: number;
  categoryName: string;
}

// 날짜별로 거래 내역을 그룹화하는 함수
const groupTransactionsByDate = (transactions: Transaction[]) => {
  return transactions.reduce((acc: { [key: string]: Transaction[] }, transaction) => {
    const date = new Date(transaction.transactionDate).toLocaleDateString('ko-KR', { timeZone: 'UTC' });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});
};

const s = {
  Container: styled.div`
    padding-top: 56px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 56px;
    height: calc(100vh - 112px);
    overflow-y: auto;
  `,
  Card: styled.div`
    background-color: #E5F3FF;
    padding: 20px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 12px;
  `,
  CardTitle: styled.span`
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
  `,
  CardTitleArea: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  `,
  CardKrw: styled.div`
    font-size: 20px;
    font-weight: 600;
  `,
  CardCaption: styled.span`
    font-size: 14px;
    font-weight: 400;
    color: #666666;
  `,
  CardButton: styled.button`
    background-color: #A2D3FF;
    font-size: 14px;
    font-weight: 500;
    height: 36px;
    width: 66px;
    border-radius: 50px;
    border: 0;
  `,
  ButtonArea: styled.div`
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 80px;
    margin-top: 8px;
  `,
  DateText: styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #444444;
  `,
  DateLine: styled.hr`
    border: solid 0.1px #D9D9D9;
    margin: 0;
    margin-top: 8px;
  `,
  PaymentTime: styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #666666;
  `,
  PaymentTitle: styled.span`
    font-size: 14px;
    font-weight: 600;
    margin-top: 8px;
  `,
  PaymentAmountBlue: styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #008DE7;
    margin-top: 8px;
  `,
  BalanceText: styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    margin-top: 8px;
  `,
  PaymentTitleArea: styled.div`
    display: flex;
    flex-direction: column;
  `,
  PaymentAmountArea: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    position: relative;
  `,
  PaymentArea: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    position: relative;
  `,
  PaymentLine: styled.hr`
    border: solid 0.1px #EFEFEF;
    margin: 0;
  `,
  EmptyMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    color: #666666;
  `,
  EditButtonContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  EditButton: styled.button`
    font-size: 10px;
    font-weight: 500;
    height: 20px;
    width: 40px;
    border-radius: 50px;
    border: 0;
    color: #333;
    background-color: #E5E5E5;
  `,
  CategorySelect: styled.select`
    margin-top: 4px;
    font-size: 10px;
    padding: 4px;
  `,
};

const ForeignDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountId } = useParams();
  const travelId = 97;

  const { data: travelDetailData, refetch: travelDetailRefetch } = useAxios(`/travels/${travelId}`, 'GET');
  const { data: travelWalletDetailData, refetch: travelWalletDetailRefetch } = useAxios(`/travel-wallet/${travelId}`, 'GET');
  const { data: exchangeData, refetch: exchangeRefetch } = useAxios('/exchange-cal', 'POST', {
    sourceCurrency: travelWalletDetailData?.data?.currency,
    targetCurrency: "KRW",
    sourceAmount: travelWalletDetailData?.data?.balance
  });
  const [transaction, setTransaction] = useState<TransactionsResponse | null>(null);
  const { data: transactionData, refetch: transactionRefetch } = useAxios(`/travel-wallet/transaction/${travelId}`, 'GET');
  const { data: categories, refetch: categoriesRefetch } = useAxios('/travels/categories', 'GET');

  const [editingTransactionId, setEditingTransactionId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(pageMove("travels"));
    travelDetailRefetch();
    travelWalletDetailRefetch();
  }, [dispatch]);

  useEffect(() => {
    if (travelWalletDetailData && !transaction) {
      const fetchData = async () => {
        await Promise.all([exchangeRefetch(), transactionRefetch()]);
      };
      fetchData();
    }
  }, [travelWalletDetailData]);

  useEffect(() => {
    if (transactionData) {
      setTransaction(transactionData);
    }
  }, [transactionData]);

  const today = new Date();
  const week = new Date(new Date().setDate(new Date().getDate() - 7));
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([week, today]);
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  const transactionGroupedByDate = transaction ? groupTransactionsByDate(transaction.data) : {};

  const handleEditClick = (transactionId: number) => {
    setEditingTransactionId(transactionId);
    categoriesRefetch();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(Number(e.target.value));
  };

  const handleUpdateTransaction = async (transactionId: number) => {
    if (selectedCategoryId !== null) {
      try {
        await axiosInstance.put(`/travel-wallet/transaction/${transactionId}/${selectedCategoryId}`);
        setEditingTransactionId(null);
        transactionRefetch();
      } catch (error) {
        console.error("거래내역 업데이트 중 오류 발생:", error);
      }
    }
  };

  return (
      <>
        <BackHeader title='내 여행 지갑' />
        <s.Container>
          <s.Card>
            <s.CardTitleArea>
              <Wallet />
              <s.CardTitle>{travelDetailData?.data?.title}</s.CardTitle>
            </s.CardTitleArea>
            <s.CardKrw>{travelWalletDetailData?.data?.balance} {travelWalletDetailData?.data?.currency}</s.CardKrw>
            <s.CardCaption>
              {travelWalletDetailData?.data?.accountBalance === 0 ? `0 원` : `${exchangeData?.data?.targetAmount} 원`}
            </s.CardCaption>
            <s.ButtonArea>
              <s.CardButton onClick={() => { navigate(`/travels/wallet/recharge/${travelId}/${travelWalletDetailData?.data?.currency}`); }}>충전</s.CardButton>
              <s.CardButton onClick={() => { navigate(`/travels/wallet/refund/${travelId}/${travelWalletDetailData?.data?.currency}`); }}>환급</s.CardButton>
            </s.ButtonArea>
          </s.Card>

          {transaction && Object.keys(transactionGroupedByDate).length === 0 ? (
              <s.EmptyMessage>거래 내역이 없습니다</s.EmptyMessage>
          ) : (
              transaction &&
              Object.keys(transactionGroupedByDate).map((date) => (
                  <React.Fragment key={date}>
                    <s.DateText>{date}</s.DateText>
                    <s.DateLine />
                    {transactionGroupedByDate[date].map((transaction) => (
                        <React.Fragment key={transaction.transactionId}>
                          <s.PaymentArea>
                            <s.PaymentTitleArea>
                              <s.PaymentTime>
                                {new Date(transaction.transactionDate).toLocaleTimeString('ko-KR', {
                                  timeZone: 'UTC',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: false,
                                })}
                              </s.PaymentTime>
                              <s.PaymentTitle>{transaction.merchantName || 'N/A'}</s.PaymentTitle>
                              <s.PaymentTitle>{transaction.categoryName || 'N/A'}</s.PaymentTitle>
                            </s.PaymentTitleArea>

                            <s.PaymentAmountArea>
                              {editingTransactionId === transaction.transactionId ? (
                                  <>
                                    <s.CategorySelect onChange={handleCategoryChange}>
                                      <option value="">카테고리를 선택하세요</option>
                                      {categories?.data?.map((category: Category) => (
                                          <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                          </option>
                                      ))}
                                    </s.CategorySelect>
                                    <s.EditButton onClick={() => handleUpdateTransaction(transaction.transactionId)}>저장</s.EditButton>
                                  </>
                              ) : (
                                  <s.EditButton onClick={() => handleEditClick(transaction.transactionId)}>수정</s.EditButton>
                              )}
                              <s.PaymentAmountBlue>{transaction.price.toLocaleString()}원</s.PaymentAmountBlue>
                              <s.BalanceText>잔액 {transaction.balance.toLocaleString()}원</s.BalanceText>
                            </s.PaymentAmountArea>
                          </s.PaymentArea>
                          <s.PaymentLine />
                        </React.Fragment>
                    ))}
                  </React.Fragment>
              ))
          )}
        </s.Container>
      </>
  );
};

export default ForeignDetailPage;
package com.ssafy.triplet.exchange.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRateCalculatorRequest {

    String targetCurrency;

    String sourceCurrency;

    Long sourceAmount;

}

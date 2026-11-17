import type { VideoGen } from "../client.js";
import { fillPath } from "../request.js";
import type {
  BillingAccountResponse,
  BillingOrder,
  BillingPaymentOptions,
  CancelBillingOrderRequest,
  CompleteBillingOrderRequest,
  CreateBillingOrderRequest,
  GetBillingOrderRequest,
  RequestBillingRefundRequest,
  RequestOptions,
} from "../types.js";

export class BillingResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation getBillingAccount
  async getBillingAccount(options?: RequestOptions): Promise<BillingAccountResponse> {
    return this.client.request<BillingAccountResponse>({
      method: "GET",
      path: "/v1/billing/account",
      signal: options?.signal,
    });
  }

  // @sdk-operation createBillingOrder
  async createBillingOrder(
    request: CreateBillingOrderRequest,
    options?: RequestOptions,
  ): Promise<BillingOrder> {
    return this.client.request<BillingOrder>({
      method: "POST",
      path: "/v1/billing/orders",
      body: { orderId: request.orderId, credits: request.credits },
      signal: options?.signal,
    });
  }

  // @sdk-operation getBillingOrder
  async getBillingOrder(
    request: GetBillingOrderRequest,
    options?: RequestOptions,
  ): Promise<BillingOrder> {
    return this.client.request<BillingOrder>({
      method: "GET",
      path: fillPath("/v1/billing/orders/{orderId}", { orderId: request.orderId }),
      signal: options?.signal,
    });
  }

  // @sdk-operation completeBillingOrder
  async completeBillingOrder(
    request: CompleteBillingOrderRequest,
    options: BillingPaymentOptions,
  ): Promise<BillingOrder> {
    return this.client.request<BillingOrder>({
      method: "POST",
      path: fillPath("/v1/billing/orders/{orderId}/complete", {
        orderId: request.orderId,
      }),
      body: {
        revision: request.revision,
        idempotencyKey: request.idempotencyKey,
      },
      paymentToken: options.paymentToken,
      signal: options.signal,
    });
  }

  // @sdk-operation cancelBillingOrder
  async cancelBillingOrder(
    request: CancelBillingOrderRequest,
    options?: RequestOptions,
  ): Promise<BillingOrder> {
    return this.client.request<BillingOrder>({
      method: "POST",
      path: fillPath("/v1/billing/orders/{orderId}/cancel", {
        orderId: request.orderId,
      }),
      body: {},
      signal: options?.signal,
    });
  }

  // @sdk-operation requestBillingRefund
  async requestBillingRefund(
    request: RequestBillingRefundRequest,
    options?: RequestOptions,
  ): Promise<BillingOrder> {
    return this.client.request<BillingOrder>({
      method: "POST",
      path: fillPath("/v1/billing/orders/{orderId}/refund", {
        orderId: request.orderId,
      }),
      body: { reason: request.reason },
      signal: options?.signal,
    });
  }
}

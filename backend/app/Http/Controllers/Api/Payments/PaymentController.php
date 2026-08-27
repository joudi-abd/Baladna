<?php

namespace App\Http\Controllers\Api\Payments;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Services\PaymentService;
use App\Http\Requests\payment\StorePaymentRequest;

class PaymentController extends Controller
{
    public function __construct(private PaymentService $paymentService)
    {
    }

    public function index()
    {
        $payments = $this->paymentService->getUserPayments();
        return response()->json([
            'success' => true,
            'message' => 'Payments retrieved successfully.',
            'data' => PaymentResource::collection($payments),
        ], 200);
    }


    public function store(StorePaymentRequest $request)
    {
        $payment = $this->paymentService->createPayment($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully.',
            'data' => new PaymentResource($payment),
        ], 201);

    }

    public function approve(Payment $payment)
    {
        $payment = $this->paymentService->approvePayment($payment);
        return response()->json([
            'success' => true,
            'message' => 'Payment approved successfully.',
            'data' => new PaymentResource($payment),
        ], 200);
    }

    public function reject(Payment $payment)
    {
        $payment = $this->paymentService->rejectPayment($payment);
        return response()->json([
            'success' => true,
            'message' => 'Payment rejected successfully.',
            'data' => new PaymentResource($payment),
        ], 200);
    }

    public function show(Payment $payment)
    {
        $payment= $this->paymentService->getPayment($payment);
        return response()->json([
            'success' => true,
            'message' => 'Payment retrieved successfully.',
            'data' => new PaymentResource($payment),
        ], 200);
    }
}

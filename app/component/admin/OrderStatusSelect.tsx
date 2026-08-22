"use client";

import { updateOrderStatus } from "@/utils/action/admin-products.action";
import { useState } from "react";
import toast from "react-hot-toast";

type OrderStatus =
  | "waiting"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "returned"
  | "reviewed";

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
};

const OrderStatusSelect = ({
  orderId,
  currentStatus,
}: Props) => {
  const [status, setStatus] =
    useState<OrderStatus>(currentStatus);

  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (
    newStatus: OrderStatus
  ) => {
    if (newStatus === status) return;

    try {
      setLoading(true);

      const result = await updateOrderStatus(
        orderId,
        newStatus
      );

      if (!result.success) {
        toast.error(
          result.error || "Failed to update order."
        );

        return;
      }

      setStatus(newStatus);

      toast.success("Order status updated.");
    } catch (error) {
      console.error(
        "ORDER STATUS UPDATE ERROR:",
        error
      );

      toast.error(
        "Something went wrong while updating the order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) =>
        handleStatusChange(
          e.target.value as OrderStatus
        )
      }
      className={`
        px-3
        py-2
        rounded-lg
        border
        text-sm
        font-medium
        outline-none
        transition
        ${
          loading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer"
        }
      `}
    >
      <option value="waiting">
        Waiting
      </option>

      <option value="processing">
        Processing
      </option>

      <option value="shipped">
        Shipped
      </option>

      <option value="delivered">
        Delivered
      </option>

      <option value="completed">
        Completed
      </option>

      <option value="cancelled">
        Cancelled
      </option>

      <option value="returned">
        Returned
      </option>

      <option value="reviewed">
        Reviewed
      </option>
    </select>
  );
};

export default OrderStatusSelect;
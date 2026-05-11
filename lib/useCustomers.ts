"use client";

import { useCallback, useState } from "react";
import { customerRepository } from "./customerRepository";
import { Customer } from "./types";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(() => customerRepository.list());

  const refresh = useCallback(() => {
    setCustomers(customerRepository.list());
  }, []);

  return { customers, refresh };
}

"use client";

import { Customer, CustomerInput } from "./types";

const STORAGE_KEY = "raifu_stamp_customers";
const MAX_STAMPS = 10;

function createId() {
  return `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function todayText() {
  return new Date().toISOString().slice(0, 10);
}

function readCustomers(): Customer[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as Customer[];
  } catch {
    return [];
  }
}

function writeCustomers(customers: Customer[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

// 保存方式をこのファイルに閉じ込めておくと、後でSupabaseへ差し替えやすくなります。
export const customerRepository = {
  list(): Customer[] {
    return readCustomers().sort((a, b) => a.name.localeCompare(b.name, "ja"));
  },

  search(keyword: string): Customer[] {
    const query = keyword.trim().toLowerCase();
    if (!query) return this.list();
    return this.list().filter((customer) =>
      `${customer.id} ${customer.name}`.toLowerCase().includes(query)
    );
  },

  findById(id: string): Customer | null {
    return readCustomers().find((customer) => customer.id === id) ?? null;
  },

  create(input: CustomerInput): Customer {
    const customer: Customer = {
      id: createId(),
      name: input.name.trim(),
      stampCount: 0,
      visitCount: 0,
      lastVisitDate: null,
      rewardUsed: false,
    };
    writeCustomers([...readCustomers(), customer]);
    return customer;
  },

  addStamp(id: string): Customer | null {
    let updated: Customer | null = null;
    const customers = readCustomers().map((customer) => {
      if (customer.id !== id) return customer;

      updated = {
        ...customer,
        stampCount: Math.min(MAX_STAMPS, customer.stampCount + 1),
        visitCount: customer.visitCount + 1,
        lastVisitDate: todayText(),
        rewardUsed: false,
      };
      return updated;
    });
    writeCustomers(customers);
    return updated;
  },

  removeStamp(id: string): Customer | null {
    let updated: Customer | null = null;
    const customers = readCustomers().map((customer) => {
      if (customer.id !== id) return customer;

      updated = {
        ...customer,
        stampCount: Math.max(0, customer.stampCount - 1),
      };
      return updated;
    });
    writeCustomers(customers);
    return updated;
  },

  markRewardUsed(id: string): Customer | null {
    let updated: Customer | null = null;
    const customers = readCustomers().map((customer) => {
      if (customer.id !== id) return customer;

      updated = {
        ...customer,
        stampCount: 0,
        rewardUsed: true,
      };
      return updated;
    });
    writeCustomers(customers);
    return updated;
  },
};

export { MAX_STAMPS };

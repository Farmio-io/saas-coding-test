import { useMutation, useQuery } from "@tanstack/react-query";
import repo from "./repo";
import { IUpdatePricing } from "./interface";

export const useUpdatePricing = () =>
  useMutation({
    mutationKey: ["update-pricing"],
    mutationFn: (body: IUpdatePricing) => repo.updatePricing(body),
  });

export const useGetHistoryById = (id: string) =>
  useQuery({
    refetchOnMount: "always",
    queryKey: ["get-history"],
    retry: false,
    queryFn: () => repo.getHistoryById(id),
  });

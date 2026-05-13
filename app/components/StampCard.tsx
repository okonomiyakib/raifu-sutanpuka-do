import { MAX_STAMPS } from "@/lib/customerRepository";

type StampCardProps = {
  stampCount: number;
};

export function StampCard({ stampCount }: StampCardProps) {
  return (
    <div className="stamp-card" aria-label={`スタンプ ${stampCount} 個`}>
      {Array.from({ length: MAX_STAMPS }).map((_, index) => {
        const filled = index < stampCount;
        return (
          <div className={`stamp-token ${filled ? "stamp-token--filled" : ""}`} key={index}>
            <span aria-hidden="true">{filled ? "◆" : index + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

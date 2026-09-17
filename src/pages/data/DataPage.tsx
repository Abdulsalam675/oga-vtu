import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import PhoneNetworkFields from "../../components/inputs/PhoneNetworkFields";
import SelectOptionModal from "../../components/modals/SelectOptionModal";
import PlanCard from "../../components/transactions/PlanCard";

type PlanCategory = "Hot deals" | "Daily" | "Weekly" | "Monthly";

type DataPlan = {
  id: string;
  networkId: string;
  name: string;
  validity: string;
  price: number;
  category: PlanCategory;
  popular?: boolean;
};

const categories: PlanCategory[] = ["Hot deals", "Daily", "Weekly", "Monthly"];

const networks = [
  { id: "mtn", name: "MTN", logo: "/logo/networks/mtn.png" },
  { id: "airtel", name: "Airtel", logo: "/logo/networks/airtel.png" },
  { id: "glo", name: "Glo", logo: "/logo/networks/glo.png" },
  {
    id: "9mobile",
    name: "T2(9Mobile)",
    logo: "/logo/networks/t2-9mobile.png",
  },
];

// mock — replace with API later
const mockPlans: DataPlan[] = [
  {
    id: "mtn-d1",
    networkId: "mtn",
    name: "100MB",
    validity: "1 day",
    price: 100,
    category: "Daily",
  },
  {
    id: "mtn-d2",
    networkId: "mtn",
    name: "200MB",
    validity: "1 day",
    price: 200,
    category: "Daily",
  },
  {
    id: "mtn-w1",
    networkId: "mtn",
    name: "750MB",
    validity: "7 days",
    price: 500,
    category: "Weekly",
  },
  {
    id: "mtn-w2",
    networkId: "mtn",
    name: "1.5GB",
    validity: "7 days",
    price: 1000,
    category: "Weekly",
    popular: true,
  },
  {
    id: "mtn-m1",
    networkId: "mtn",
    name: "2GB",
    validity: "30 days",
    price: 1500,
    category: "Monthly",
  },
  {
    id: "mtn-m2",
    networkId: "mtn",
    name: "5GB",
    validity: "30 days",
    price: 3500,
    category: "Monthly",
    popular: true,
  },
  {
    id: "mtn-h1",
    networkId: "mtn",
    name: "1.2GB",
    validity: "7 days",
    price: 800,
    category: "Hot deals",
    popular: true,
  },
  {
    id: "mtn-h2",
    networkId: "mtn",
    name: "3GB",
    validity: "30 days",
    price: 2000,
    category: "Hot deals",
  },
  {
    id: "airtel-d1",
    networkId: "airtel",
    name: "150MB",
    validity: "1 day",
    price: 100,
    category: "Daily",
  },
  {
    id: "airtel-m1",
    networkId: "airtel",
    name: "3GB",
    validity: "30 days",
    price: 2000,
    category: "Monthly",
    popular: true,
  },
  {
    id: "airtel-h1",
    networkId: "airtel",
    name: "2.5GB",
    validity: "14 days",
    price: 1500,
    category: "Hot deals",
  },
];

interface DataPageProps {
  userPhoneNumber?: string;
}

function DataPage({ userPhoneNumber = "" }: DataPageProps) {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedNetworkId, setSelectedNetworkId] = useState("mtn");
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [selectedNetworkLogo, setSelectedNetworkLogo] = useState(
    "/logo/networks/mtn.png",
  );
  const [activeCategory, setActiveCategory] =
    useState<PlanCategory>("Hot deals");
  const [showModal, setShowModal] = useState(false);

  const filteredPlans = useMemo(() => {
    return mockPlans.filter(
      (plan) =>
        plan.networkId === selectedNetworkId &&
        plan.category === activeCategory,
    );
  }, [selectedNetworkId, activeCategory]);

  function handleSelectNetwork(network: {
    id: string;
    name: string;
    logo?: string;
  }) {
    setSelectedNetworkId(network.id);
    setSelectedNetwork(network.name);
    setSelectedNetworkLogo(network.logo || "");
    setActiveCategory("Daily");
    setShowModal(false);
  }

  function handleBuyForSelf() {
    if (userPhoneNumber) {
      setPhoneNumber(userPhoneNumber);
      setPhoneError("");
    }
  }

  function handlePhoneChange(value: string) {
    setPhoneNumber(value);
    if (phoneError) setPhoneError("");
  }

  function handlePlanClick(plan: DataPlan) {
    if (phoneNumber.trim().length < 10) {
      setPhoneError("Enter a valid phone number");
      return;
    }

    navigate("/dashboard/data/confirm", {
      state: {
        phoneNumber,
        networkName: selectedNetwork,
        networkLogo: selectedNetworkLogo,
        amount: String(plan.price),
        planName: plan.name,
        planValidity: plan.validity,
      },
    });
  }

  return (
    <SubPageLayout title="Buy Data" titleSize="sm">
      <div className="space-y-6">
        <div>
          <PhoneNetworkFields
            phoneNumber={phoneNumber}
            onPhoneChange={handlePhoneChange}
            userPhoneNumber={userPhoneNumber}
            onBuyForSelf={handleBuyForSelf}
            selectedNetwork={selectedNetwork}
            selectedNetworkLogo={selectedNetworkLogo}
            onNetworkClick={() => setShowModal(true)}
          />
          {phoneError && (
            <p className="mt-2 pl-3 text-xs font-medium text-error">
              {phoneError}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-dark">
            Select plan
          </label>
          <div className="space-y-4">
            <div className="sticky top-14 z-10 -mx-1 bg-gray-extra-light px-1 py-2">
              <div className="scrollbar-none flex gap-2 overflow-x-auto">
                {categories.map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={
                        "shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors " +
                        (active
                          ? "bg-primary text-white"
                          : "bg-white text-gray-semi-dark active:bg-gray-lightest")
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
            {filteredPlans.length === 0 ? (
              <div className="rounded-2xl bg-white px-4 py-10 text-center">
                <p className="text-sm text-gray-light">
                  No plans in this category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {filteredPlans.map((plan) => (
                  <PlanCard key={plan.id} onClick={() => handlePlanClick(plan)}>
                    {plan.popular && (
                      <span className="absolute right-2.5 top-2.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                        Hot
                      </span>
                    )}
                    <div className={plan.popular ? "pr-8" : ""}>
                      <p className="text-[15px] font-semibold tracking-tight text-gray-dark">
                        {plan.name}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-gray-light">
                        {plan.validity}
                      </p>
                    </div>
                    <p className="mt-4 text-sm font-extrabold text-primary">
                      ₦{plan.price.toLocaleString("en-NG")}
                    </p>
                  </PlanCard>
                ))}
              </div>
            )}
          </div>
        </div>
        <SelectOptionModal
          open={showModal}
          title="Select network"
          options={networks}
          selectedId={selectedNetworkId}
          onClose={() => setShowModal(false)}
          onSelect={handleSelectNetwork}
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(DataPage);

import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import SelectOptionModal from "../../components/modals/SelectOptionModal";
import PlanCard from "../../components/transactions/PlanCard";
import ServiceDetailsFields from "../../components/inputs/ServiceDetailsFields";

type Provider = {
  id: string;
  name: string;
  logo?: string;
};

type CablePackage = {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  validity: string;
  popular?: boolean;
};

const providers: Provider[] = [
  {
    id: "dstv",
    name: "DSTV",
    logo: "/logo/cable/dstv.png",
  },
  {
    id: "gotv",
    name: "GOtv",
    logo: "/logo/cable/gotv.png",
  },
  {
    id: "startimes",
    name: "StarTimes",
    logo: "/logo/cable/startimes.png",
  },
  {
    id: "showmax",
    name: "Showmax",
    logo: "/logo/cable/showmax.png",
  },
];

// mock — replace with API later
const mockPackages: CablePackage[] = [
  {
    id: "dstv-padi-w",
    providerId: "dstv",
    name: "DStv Padi",
    description: "40+ channels",
    price: 1100,
    validity: "1 Week",
  },
  {
    id: "dstv-padi",
    providerId: "dstv",
    name: "DStv Padi",
    description: "40+ channels",
    price: 4400,
    validity: "1 Month",
  },
  {
    id: "dstv-yanga-w",
    providerId: "dstv",
    name: "DStv Yanga",
    description: "60+ channels",
    price: 1500,
    validity: "1 Week",
  },
  {
    id: "dstv-yanga",
    providerId: "dstv",
    name: "DStv Yanga",
    description: "60+ channels",
    price: 6000,
    validity: "1 Month",
    popular: true,
  },
  {
    id: "dstv-compact",
    providerId: "dstv",
    name: "DStv Compact",
    description: "95+ channels",
    price: 19000,
    validity: "1 Month",
  },
  {
    id: "dstv-premium",
    providerId: "dstv",
    name: "DStv Premium",
    description: "All channels",
    price: 44500,
    validity: "1 Month",
  },
  {
    id: "gotv-smallie-w",
    providerId: "gotv",
    name: "GOtv Smallie",
    description: "30+ channels",
    price: 500,
    validity: "1 Week",
  },
  {
    id: "gotv-smallie",
    providerId: "gotv",
    name: "GOtv Smallie",
    description: "30+ channels",
    price: 1900,
    validity: "1 Month",
  },
  {
    id: "gotv-jinja",
    providerId: "gotv",
    name: "GOtv Jinja",
    description: "50+ channels",
    price: 3900,
    validity: "1 Month",
    popular: true,
  },
  {
    id: "gotv-max",
    providerId: "gotv",
    name: "GOtv Max",
    description: "80+ channels",
    price: 8500,
    validity: "1 Month",
    popular: true,
  },
  {
    id: "gotv-supa",
    providerId: "gotv",
    name: "GOtv Supa",
    description: "95+ channels",
    price: 11400,
    validity: "1 Month",
  },
  {
    id: "startimes-nova-w",
    providerId: "startimes",
    name: "Nova",
    description: "35+ channels",
    price: 600,
    validity: "1 Week",
  },
  {
    id: "startimes-nova",
    providerId: "startimes",
    name: "Nova",
    description: "35+ channels",
    price: 1900,
    validity: "1 Month",
  },
  {
    id: "startimes-basic",
    providerId: "startimes",
    name: "Basic",
    description: "60+ channels",
    price: 3700,
    validity: "1 Month",
    popular: true,
  },
  {
    id: "startimes-classic",
    providerId: "startimes",
    name: "Classic",
    description: "85+ channels",
    price: 6200,
    validity: "1 Month",
  },
  {
    id: "startimes-super",
    providerId: "startimes",
    name: "Super",
    description: "100+ channels",
    price: 10500,
    validity: "1 Month",
  },
  {
    id: "showmax-mobile",
    providerId: "showmax",
    name: "Mobile",
    description: "Mobile only",
    price: 1600,
    validity: "1 Month",
  },
  {
    id: "showmax-entertainment",
    providerId: "showmax",
    name: "Entertainment",
    description: "All devices",
    price: 3200,
    validity: "1 Month",
    popular: true,
  },
  {
    id: "showmax-pro",
    providerId: "showmax",
    name: "Pro",
    description: "Sports + shows",
    price: 6300,
    validity: "1 Month",
  },
];

function CableTvPage() {
  const navigate = useNavigate();

  const [selectedProvider, setSelectedProvider] = useState<Provider>(
    providers[0],
  );
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [cardError, setCardError] = useState("");

  const filteredPackages = useMemo(() => {
    return mockPackages.filter((pkg) => pkg.providerId === selectedProvider.id);
  }, [selectedProvider.id]);

  function handleSelectProvider(item: {
    id: string;
    name: string;
    logo?: string;
    subtitle?: string;
  }) {
    setSelectedProvider({
      id: item.id,
      name: item.name,
      logo: item.logo,
    });
    setShowProviderModal(false);
  }

  function handleCardChange(value: string) {
    setSmartCardNumber(value);
    if (cardError) setCardError("");
  }

  function handlePackageClick(pkg: CablePackage) {
    if (smartCardNumber.trim().length < 10) {
      setCardError("Enter a valid smartcard number");
      return;
    }

    navigate("/dashboard/cable-tv/confirm", {
      state: {
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        providerLogo: selectedProvider.logo,
        smartCardNumber,
        packageName: pkg.name,
        packageDescription: pkg.description,
        packageValidity: pkg.validity,
        amount: String(pkg.price),
      },
    });
  }

  return (
    <SubPageLayout title="Cable TV" titleSize="sm">
      <div className="space-y-6">
        <ServiceDetailsFields
          label="Decoder details"
          selectedOption={selectedProvider}
          selectPlaceholder="Select provider"
          inputPlaceholder="Smartcard / IUC number"
          value={smartCardNumber}
          maxLength={13}
          fallbackIcon="solar:tv-linear"
          error={cardError}
          onSelect={() => setShowProviderModal(true)}
          onChange={handleCardChange}
        />
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-dark">
            Select package
          </label>

          {filteredPackages.length === 0 ? (
            <div className="rounded-2xl bg-white px-4 py-10 text-center">
              <p className="text-sm text-gray-light">
                No packages available for this provider
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {filteredPackages.map((pkg) => (
                <PlanCard key={pkg.id} onClick={() => handlePackageClick(pkg)}>
                  {pkg.popular && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                      Hot
                    </span>
                  )}
                  <p
                    className={
                      "text-[15px] font-semibold leading-tight tracking-tight text-gray-dark " +
                      (pkg.popular ? "pr-8" : "")
                    }
                  >
                    {pkg.name}
                  </p>
                  <span className="mt-2 w-fit rounded-md bg-gray-extra-light px-2 py-0.5 text-[10px] font-semibold text-gray-semi-dark">
                    {pkg.validity}
                  </span>
                  <p className="mt-3 text-sm font-extrabold text-primary">
                    ₦{pkg.price.toLocaleString("en-NG")}
                  </p>
                </PlanCard>
              ))}
            </div>
          )}
        </div>

        <SelectOptionModal
          open={showProviderModal}
          title="Select provider"
          options={providers}
          selectedId={selectedProvider.id}
          onClose={() => setShowProviderModal(false)}
          onSelect={handleSelectProvider}
          fallbackIcon="solar:tv-linear"
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(CableTvPage);

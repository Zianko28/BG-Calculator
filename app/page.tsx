import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function BigGrowthCalculator() {
  const [coin, setCoin] = useState("ETH");
  const [lastTrade, setLastTrade] = useState("Buy");
  const [lastPrice, setLastPrice] = useState(3000);
  const [result, setResult] = useState(null);

  const levels = {
    ETH: {
      Buy: [
        { drop: -5, rebound: 1.2 },
        { drop: -10, rebound: 1.5 },
        { drop: -15, rebound: 2.0 }
      ],
      Sell: [
        { gain: 3.5, trail: 1.2 },
        { gain: 7, trail: 1.5 },
        { gain: 11, trail: 2.0 },
        { gain: 16, trail: 2.5 }
      ]
    },
    SOL: {
      Buy: [
        { drop: -6, rebound: 1.5 },
        { drop: -12, rebound: 2.0 },
        { drop: -18, rebound: 2.5 }
      ],
      Sell: [
        { gain: 4.5, trail: 1.4 },
        { gain: 8, trail: 1.8 },
        { gain: 12, trail: 2.2 },
        { gain: 18, trail: 2.8 }
      ]
    }
  };

  const handleCalculate = () => {
    const next = levels[coin][lastTrade][0];
    if (lastTrade === "Sell") {
      const targetPrice = lastPrice * (1 + next.gain / 100);
      const trail = next.trail;
      setResult(`Next SELL: Trigger at +${next.gain}% → $${targetPrice.toFixed(2)}, trailing stop: -${trail}%`);
    } else {
      const targetPrice = lastPrice * (1 + next.drop / 100);
      const rebound = next.rebound;
      setResult(`Next BUY: Trigger at ${next.drop}% dip → $${targetPrice.toFixed(2)}, rebound to confirm: +${rebound}%`);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Big Growth Plan - Next Trade Calculator</h2>

      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Coin: {coin}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setCoin("ETH")}>ETH</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCoin("SOL")}>SOL</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Last Trade: {lastTrade}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLastTrade("Buy")}>Buy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLastTrade("Sell")}>Sell</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          type="number"
          value={lastPrice}
          onChange={(e) => setLastPrice(parseFloat(e.target.value))}
          placeholder="Last trade price"
        />

        <Button onClick={handleCalculate}>Calculate</Button>
      </div>

      {result && (
        <Card>
          <CardContent className="p-4">
            <p className="text-md font-semibold">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


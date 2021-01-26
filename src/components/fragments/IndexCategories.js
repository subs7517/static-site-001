const Categories = () => {
  const motherBoardL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const motherBoardN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const motherBoard = motherBoardL.map((item, index) => ({
    name: motherBoardN[index],
    link: item,
  }));

  const cpuCoolersL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const cpuCoolersN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const cpuCoolers = cpuCoolersL.map((item, index) => ({
    name: cpuCoolersN[index],
    link: item,
  }));

  const CPUsL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const CPUsN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const CPUs = CPUsL.map((item, index) => ({
    name: CPUsN[index],
    link: item,
  }));

  const RamsL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const RamsN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Rams = RamsL.map((item, index) => ({
    name: RamsN[index],
    link: item,
  }));

  const GPUL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const GPUN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const GPU = GPUL.map((item, index) => ({
    name: GPUN[index],
    link: item,
  }));

  const LaptopsL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const LaptopsN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Laptops = LaptopsL.map((item, index) => ({
    name: LaptopsN[index],
    link: item,
  }));

  const MonitorsL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const MonitorsN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Monitor = MonitorsL.map((item, index) => ({
    name: MonitorsN[index],
    link: item,
  }));

  const CasesL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const CasesN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Cases = CasesL.map((item, index) => ({
    name: CasesN[index],
    link: item,
  }));

  const PSUL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const PSUN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const PSU = PSUL.map((item, index) => ({
    name: PSUN[index],
    link: item,
  }));

  const ComparisonsL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const ComparisonsN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Comparisons = ComparisonsL.map((item, index) => ({
    name: ComparisonsN[index],
    link: item,
  }));

  const MouseL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const MouseN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Mouse = MouseL.map((item, index) => ({
    name: MouseN[index],
    link: item,
  }));

  const TierL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const TierN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Tier = TierL.map((item, index) => ({
    name: TierN[index],
    link: item,
  }));

  const KeyboardsL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const KeyboardsN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const Keyboards = KeyboardsL.map((item, index) => ({
    name: KeyboardsN[index],
    link: item,
  }));

  const ThermalPasteL = ["/sample-post-buying/", "/sample-post-buying-2/", "/sample-post-buying-3/"];
  const ThermalPasteN = ["Sample Post Buying Guide", "Sample Post Buying Guide 2", "Sample Post Buying Guide 3"];
  const ThermalPaste = ThermalPasteL.map((item, index) => ({
    name: ThermalPasteN[index],
    link: item,
  }));

  const AllCategories_Names = ["Motherboard", "GPU", "CPU Cooler", "PC Case", "CPU", "RAM", "Comparison", "PSU", "Tier List", "Laptop", "Monitor", "Mouse", "Thermal Paste", "Keyboard"];
  const AllCategories_Data = [motherBoard, GPU, cpuCoolers, Cases, CPUs, Rams, Comparisons, PSU, Tier, Laptops, Monitor, Mouse, ThermalPaste, Keyboards];
  const AllCategories = AllCategories_Data.map((item, index) => ({
    name: AllCategories_Names[index],
    data: item,
  }));

  return AllCategories;
};

export default Categories;

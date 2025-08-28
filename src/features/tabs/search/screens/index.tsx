import { IMAGES } from "@/src/assets";
import searchData from "@/src/assets/jsons/search.json";
import { FilterChips, Input } from "@/src/components";
import { useGlobalThemedStyles } from "@/src/styles";
import { ProductInfo } from "@/src/types/productPost";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown, StretchInX } from "react-native-reanimated";
import PeopleCard from "../components/peopleCard";
import ProductCard from "../components/productCard";
import StoreCard from "../components/storeCard";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";

const HEADER_TABS = [
  { label: "People", key: "people" },
  { label: "Stores", key: "stores" },
  { label: "Products", key: "products" }
];


export function Search() {
  const globalStyles = useGlobalThemedStyles();
  const [activeKey, setActiveKey] = useState<"people" | "stores" | "products">("people");
  const styles = useThemedStyles();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const products = React.useMemo<ProductInfo[]>(() => {
    return (searchData as any).products || [];
  }, []);

  const productCategories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    ) as string[];

    return uniqueCategories.map((cat) => ({
      id: cat,
      label: cat
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  }, [products]);

  const filteredData = React.useMemo(() => {
    let baseData: any[] = [];

    // --- Products ---
    if (activeKey === "products") {
      baseData = !selectedProduct
        ? products
        : products.filter((item: ProductInfo) => item.category === selectedProduct);

      if (!searchQuery) return baseData;

      const search = searchQuery.toLowerCase();
      return baseData.filter((item: ProductInfo) => {
        const title = item.title?.toLowerCase() ?? "";
        const brand = item.brand?.toLowerCase() ?? "";
        return title.includes(search) || brand.includes(search);
      });
    }

    // --- People ---
    if (activeKey === "people") {
      baseData = (searchData as any).people || [];

      if (!searchQuery) return baseData;

      const search = searchQuery.toLowerCase();
      return baseData.filter((item: { name?: string; location?: string }) => {
        const name = item.name?.toLowerCase() ?? "";
        const location = item.location?.toLowerCase() ?? "";
        return name.includes(search) || location.includes(search);
      });
    }

    // --- Stores ---
    if (activeKey === "stores") {
      baseData = (searchData as any).stores || [];

      if (!searchQuery) return baseData;

      const search = searchQuery.toLowerCase();
      return baseData.filter((item: { name?: string; location?: string }) => {
        const name = item.name?.toLowerCase() ?? "";
        const location = item.location?.toLowerCase() ?? "";
        return name.includes(search) || location.includes(search);
      });
    }

    return [];
  }, [activeKey, selectedProduct, products, searchQuery]);

  const handleEnter = (msg: string) => {
    setSearchQuery(msg.trim().toLowerCase());
  };

  const inputUI = () => {
    return (
      <Input onEnter={handleEnter} />
    )
  }

  const headerTabs = useCallback(() => {
    return (
      <View style={styles.tabRow}>
        {HEADER_TABS.map((tab) => (
          <View style={{ alignItems: 'center' }} key={tab.key}>
            <Pressable onPress={() => setActiveKey(tab.key as any)}>
              <Text style={styles.tabText}>
                {tab.label}
              </Text>
            </Pressable>
            {activeKey === tab.key ? (
              <Animated.View
                key={`${tab.key}-active`}
                entering={StretchInX.duration(200).springify().damping(10).stiffness(120)}
                style={[styles.tabIndicator, styles.activeTabIndicator]}
              />
            ) : (
              <View
                key={`${tab.key}-inactive`}
                style={[styles.tabIndicator]}
              />
            )}
          </View>
        ))}
      </View>
    )
  }, [activeKey, styles])

  const filterChips_UI = () => {
    return (
      activeKey === 'products' &&
      <FlashList
        horizontal
        data={productCategories}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.chipList}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
        extraData={selectedProduct}
        renderItem={({ item, index }) => (
          <FilterChips
            index={index}
            label={item.label}
            isActive={item.id === selectedProduct}
            onPress={() =>
              setSelectedProduct(prev =>
                prev === item.id ? '' : item.id
              )
            }
          />
        )}
      />
    )
  }


  const renderItem = useCallback(
    ({ item, index }: any) => {
      if (activeKey === "people") return <PeopleCard item={item} index={index} />;
      if (activeKey === "stores") return <StoreCard item={item} index={index} />;
      return <ProductCard item={item} index={index} />;
    },
    [activeKey]
  );

  const mainListContainerUI = () => {
    return (
      <View style={styles.list}>
        <FlashList
          key={activeKey}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item: any, index: number) => item.id?.toString() ?? String(index)}
          estimatedItemSize={250}
          numColumns={activeKey === "products" ? 2 : 1}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Animated.View entering={FadeInDown.duration(800).springify().damping(5).stiffness(120)} style={styles.emptyUI}>
              <Image style={styles.sorryAnimation} source={IMAGES.SORRY} />
              <Text style={styles.emptyText}>{strings.nothingMatched}</Text>
            </Animated.View>
          )}
        />
      </View>
    )
  }

  return (
    <View style={globalStyles.mainContainer}>
      {inputUI()}
      {headerTabs()}
      {filterChips_UI()}
      {mainListContainerUI()}
    </View>
  );
}

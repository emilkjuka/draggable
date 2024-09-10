<script lang="ts">
  import MissingList from "$lib/common/MissingList.svelte";
  import CaughtList from "$lib/common/CaughtList.svelte";
  import { missing, caught } from "$lib/stores";
  import { type Pokemon } from "$lib/types";
  import { onMount } from "svelte";

  const pokemons = [
    { name: "Pikachu", sprite: "", types: ["lightning"] },
    { name: "Charmander", sprite: "", types: ["lightning"] },
    { name: "Bulbasaur", sprite: "", types: ["lightning"] },
    { name: "Diglet", sprite: "", types: ["lightning"] },
  ];
  onMount(() => {
    missing.set(pokemons);
    caught.set([]);
  });
</script>

<div class="w-full h-dvh flex flex-col justify-center items-center gap-10">
  <div class="text-3xl"> Pokedex </div>
  <div class="w-full flex justify-center items-center gap-10">
    <MissingList title={"Missing"} />
    <CaughtList title={"Caught"} />
  </div>
</div>

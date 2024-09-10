<script lang="ts">
  import type { Pokemon } from "$lib/types";
  import { draggable } from "../draggable";

  export let pokemon: Pokemon;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->

<div
  use:draggable={pokemon.name}
  class="w-full border border-gray-500 flex flex-col justify-center items-start hover:cursor-grab active:cursor-grabbing p-2 bg-slate-300 rounded-md"
>
  <div>
    {pokemon.name}
  </div>
  <div>
    {pokemon.types}
  </div>
</div>

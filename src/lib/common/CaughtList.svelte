<script lang="ts">
  import { type Pokemon } from "../types";
  import Card from "./Card.svelte";
  import { dropzone } from "../draggable";
  import { caught, missing } from "$lib/stores";

  export let title = "Title";

</script>

<div class="flex gap-10 flex-col justify-between items-center">
  <div> {title} {$caught?.length}</div>
  <div class="list w-[300px] h-[400px] border-2 border-gray-800 rounded-md p-4 flex flex-col gap-2" use:dropzone={{on_dropzone(name: string) {

    const pokemon = $missing.find((p) => p.name === name) as Pokemon;
    const missingUpdated = $missing.filter((p) => p.name !== name)

    caught.update((value) => [...value, pokemon]);
    missing.set(missingUpdated);
  }}}>
  {#if $caught}
    {#each $caught as pokemon, i}
      <Card {pokemon} />
    {/each}
  {:else} 
  Loading...{
    /if
  }
  </div>
</div>

<style>
  .list:global(.droppable) {
    outline: 2px solid orangered;
    outline-offset: 0.25px;
  }

  .list:global(.droppable) * {
    pointer-events: none;
  }
</style>

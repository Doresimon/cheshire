
    new Vue({
      el: '#main',
      // el: '#cheshire-dashboard',
      data: {
        colorMap: {
          babyblue: '#4eb4f9',
          babypuke: '#bcba5e',
          bubblegum: '#fbe0f4',
          chestnut: '#efe1db',
          coral: '#45f0f4',
          gold: '#faf5cf',
          limegreen: '#d9f5cc',
          mintgreen: '#d9f5cc',
          pumpkin: '#ffa039',
          sizzurp: '#dfe0fa',
          strawberry: '#fcdedf',
          thundergrey: '#828282',
          topaz: '#d1eeeb',
          violet: '#ba8aff',
        },
        contracts: {},
        kitties: [],
        users: [],
        import_data:{
          mainID: 0,
          newID:0,
          user:{},
          busy:0,
        },
        create_data:{
          matronId:0,
          sireId:0,
          generation:0,
          genes:0,
          owner:{},
          apiObject:{},
          busy:0,
        },
      },

      // async created () {
      async mounted () {
        this.contracts = (await axios.get('/cheshire/contracts')).data
        this.kitties = (await axios.get('/kitties?limit=-1')).data.kitties.map((kitty) => {
          kitty.showAttrs = false
          return kitty
        })
        this.users = (await axios.get('/cheshire/users')).data.users
      },

      // new methods
      methods:{

        //import a cat by ID and user.
        importCat: async function(ID,address){
          var _this = this

          _this.import_data.busy = 1

          const params = {
            kittyIdMainnet:ID,
            ownerTestnet:address,
          }

          this.import_data.newID = (await axios.post('/cheshire/kitties/import',params)).data.kittyId

          var d = (await axios.get('/kitties/'+this.import_data.newID)).data

          this.kitties.push(d)

          _this.import_data.busy = 0
        },

        // create cat
        // createKitty(matronId, sireId, generation, genes, owner, apiObject)
        createCat: async function(matronId, sireId, generation, genes, owner, apiObject){
          var _this = this

          _this.create_data.busy = 1

          const params = {
            matronId:matronId,
            sireId:sireId,
            generation:generation,
            genes:genes,
            owner:owner,
            apiObject:apiObject,
          }

          this.create_data.newID = (await axios.post('/cheshire/kitties',params)).data.kittyId

          var d = (await axios.get('/kitties/'+this.create_data.newID)).data

          this.kitties.push(d)

          _this.create_data.busy = 0
        },

      }
    })

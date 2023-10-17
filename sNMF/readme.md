# sNMF

## Step one: Convert VCF file to .ped file:
- Based upon the suggestions from sNMF software developers: https://www.biostars.org/p/231892/
- Used plink on the command line to make .ped instead of VCFTools.
  
```
plink --vcf C_sulph_only_FINAL_copy.vcf --double-id --recode --out myplink1

```

- What is a ped file?

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/1b7e13e3-512b-402e-ba32-472a71ec3170)


## Screenshot of original VCF file:
![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/875c7f0a-5e31-4bf8-b712-f5da64ef5c26)

## Screenshot of the ped file looks like:

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/6ad071ae-0d0d-4a23-a559-fab290c0f52d)

## Step two: convert .ped file to .lfmm files with LEA package:
- Note that .lfmm can be obtained from .ped directly by removing the first (six) columns (.lfmm = genotypes in rows, no additional info)."
```{r}
input.ped <- ("C:/Users/shawn/Desktop/myplink1.ped")

```

```{r}
lfmm.input <- ped2lfmm(input.ped, output.file = "C:/Users/shawn/Desktop/mylfmm.lfmm", force = TRUE)
```

## Screenshot of lfmm file:

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/b9339c7c-b3f9-4d83-941d-0f6a1a64b92d)



## Step three: convert .ped file to .geno files with LEA package:

```{r}
geno.input <- ped2geno(input.ped, output.file = "C:/Users/shawn/Desktop/Cs_only.geno", force = TRUE)
```

## Screenshot of geno file: 

![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/27ea96f3-956f-49c8-ad91-ff9f41bcedde)

- Add samples names to row one in each column using excel.
- The geno file should now look like this:

  ![image](https://github.com/mcmurtrs/Cs_pop_gen/assets/49656044/b78c8427-b7ef-42a8-9313-d4748b74fafd)



## Step four: with all files and file formats needed, start the sMNF analysis:

- Following the tutorial found here:
` https://connor-french.github.io/intro-pop-structure-r/ `

# First sNMF run
```{r}

Cs_snmf <- snmf(input.file = "C:/Users/shawn/Desktop/Cs_only.geno",
                   K = 1:15,
                   entropy = TRUE,
                   repetitions = 5,
                   project = "new",
                   alpha = 100
                  )

```



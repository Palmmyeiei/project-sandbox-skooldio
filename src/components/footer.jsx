import { ArrowForward } from "@mui/icons-material";
import { Button, TextField, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "black",
        color: "white",
        py: "24px",
        px: "160px",
        mt: "160px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container flex flex-col gap-[16px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[45px]">
          <div className="flex flex-col gap-[24px] ">
            <p className="text-[32px] font-bold">Featured product</p>
            <ul className="list-none space-y-[16px]">
              {["Men", "Ladies", "Shoes", "Accessories"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[24px]">
            <p className="text-[32px] font-bold">Register with us</p>
            <p className="text-[16px] font-normal">
              Sign up now and get 20% off your first purchase!
            </p>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: "gray.300",
                },
                width: "166px",
                height: "54px",
                borderRadius: "0",
                fontSize: "16px",
                paddingY: "10px",
                paddingX: "8px",
              }}
              endIcon={<ArrowForward />}
            >
              Sign up now
            </Button>
          </div>

          {/* Customer Services Section */}
          <div className="flex flex-col gap-[24px]">
            <p className="text-[32px] font-bold">Customer services</p>
            <div className="flex flex-col gap-[16px]">
              <p className="text-[16px] font-normal">
                MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan,
                Bangkok 10330
              </p>
              <p className="text-[16px] font-normal">
                Email: jane.doe@realmail.com
              </p>
            </div>
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{ display: "flex", gap: 1, width: "100%" }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "100px",
                height: "54px",
                bgcolor: "#DEF81C",
                color: "black",
                "&:hover": {
                  bgcolor: "#A8D933",
                },
                borderRadius: "0",
                paddingX: "10px",
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 flex justify-between items-center text-sm text-gray-400">
          <p>Copyright © 2024 All rights reserved for all contents.</p>
          <div className="flex items-center space-x-2">
            <span>Powered by</span>
            <img
              src="/placeholder.svg?height=20&width=60"
              alt="Shopify logo"
              className="h-5"
            />
            <img
              src="/placeholder.svg?height=20&width=60"
              alt="WEB3 logo"
              className="h-5"
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
